require 'uri'

class PostsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_developer, only: [:odlatency, :ocrlatency, :nerdatelatency, :nercategorieslatency, :nertitlelatency, :acceptedaiml, :rejectedaiml]

  # GET /posts or /posts.json
  def index
    @posts = Post.all
  end

  def allpostsjson
    @posts = Post.all
    respond_to do |format|
      format.html { render json: @posts}
      format.json {render json: @posts}
    end
  end

  # Retrieves the first N entries
  def postsinbatches
    @posts = Post.first(15)
    respond_to do |format|
      format.html { render json: @posts}
      format.json {render json: @posts}
    end
  end

  # Calls Google label detection and returns generated tags
  def taggen

    # Start timer for query latency calculations
    @starting = Process.clock_gettime(Process::CLOCK_MONOTONIC)

    # Obtain image URL
    @post = Post.find(params[:id])
    # render json: {'post_images': @post.images}
    if @post.images.to_s.empty?
      render json: {'images': @post.images.to_s}
    else
      @img_urls = @post.images.split(',')
      # render json: {'img_urls': @img_urls}
      @raw_img_url = @img_urls.first.to_s
      @raw_img_url = @raw_img_url.gsub('{','')
      @raw_img_url = @raw_img_url.gsub('}','')
      # render json: {'raw_img_url': @raw_img_url}
      if @raw_img_url =~ /\A#{URI::regexp(['http', 'https'])}\z/
        # Download image and store locally
        tempfile = Down.download(@raw_img_url)
        FileUtils.mv(tempfile.path, "./temp_img.jpg")
        
        # Generate appropriate request.json
        # Using local image in base64 encoding
        @IMAGE_FILE = './temp_img.jpg'
        @base64_image = Base64.strict_encode64(File.new(@IMAGE_FILE, 'rb').read)
        @body = {
          "requests": [
              {
                "image": {
                  "content": @base64_image
                },
                "features": [
                  {
                    "type": "LABEL_DETECTION",
                    "maxResults": 50
                  }
                ]
              }
          ]
        }

        # render json: {'body': @body}

        # Send POST request
        @API_KEY = 'AIzaSyCEzKnbVT6d4vS6AkNi8JTmn5URLSxJ-AY'
        @API_URL = "https://vision.googleapis.com/v1/images:annotate?key=#{@API_KEY}"
        # render json: {'API_URL': @API_URL}

        uri = URI.parse(@API_URL)
        https = Net::HTTP.new(uri.host, uri.port)
        https.use_ssl = true
        request = Net::HTTP::Post.new(uri.request_uri)
        request["Content-Type"] = "application/json"
        response = https.request(request, @body.to_json)

        # # Receive and process result
        # render json: {'response body': response.body}
        result = JSON.parse(response.body)
        @post.meta_label_detection = result.to_s
        tags = result['responses'][0]
        tags = tags['labelAnnotations']
        processed_tags = []
        tags.each { |x| processed_tags.append(x['description']) }
        @post.gen_tags = processed_tags

        # Stop timer for query latency calculations
        @ending = Process.clock_gettime(Process::CLOCK_MONOTONIC)
        @latency = @ending - @starting
        @post.od_latency = @latency * 1000
        @post.save
        # render json: {'starting': @starting, 'ending': @ending, 'latency': @latency, 'od_latency': @post.od_latency}
        
        # Return tags to frontend as json
        render json: {'gen_tags': processed_tags}
      else
        render json: {'images': "no valid image url found"}
      end
    end
    
    # Using image on GCS
    # @body = {
    #   "requests": [
    #       {
    #         "image": {
    #           "source": {
    #               "imageUri": "gs://rubyduckies_cloudstorage/91g7pxvfrk2k75cfa3vg79zm0tem"
    #           }
    #         },
    #         "features": [
    #           {
    #             "type": "LABEL_DETECTION",
    #             "maxResults": 10
    #           }
    #         ]
    #       }
    #   ]
    # }
  end

  # Calls custom trained categories detection model and returns generated categories
  def catgen

    # Start timer for query latency calculations
    @starting = Process.clock_gettime(Process::CLOCK_MONOTONIC)

    # Obtain post description text
    @post = Post.find(params[:id])
    @raw_des = @post.content
    @processed_des = @raw_des
    # @processed_des = ""
    if @processed_des.to_s.empty?
      render json: {'content': ""}
    else
      # @processed_des = @processed_des.gsub(/[\u{1F600}-\u{1F6FF}]/,'')
      # @processed_des = @processed_des.gsub!(/\xC2/n, '')
      # @processed_des = @processed_des.gsub!(/\W/,' ')
      # render json: {'processed_des': @processed_des}

      # Generate appropriate request.json
      @body = {
        "instances": {
          "mimeType": "text/plain",
          "content": @processed_des
        }
      }

      # render json: {'body': @body}
      scope = 'https://www.googleapis.com/auth/cloud-platform'

      authorizer = Google::Auth::ServiceAccountCredentials.make_creds(
        json_key_io: File.open('./monstyrxai-41a5fb651ce9.json'),
        scope: scope)

      @ACCESS_TOKEN = authorizer.fetch_access_token!
      @ACCESS_TOKEN = @ACCESS_TOKEN['access_token']
      @ACCESS_TOKEN = @ACCESS_TOKEN.gsub('.',' ')
      @ACCESS_TOKEN = @ACCESS_TOKEN.strip
      @ACCESS_TOKEN = @ACCESS_TOKEN.gsub(' ','.')

      # render json: {'access-token': @ACCESS_TOKEN}
      
      # Send POST request
      # @ACCESS_TOKEN ="ya29.A0AVA9y1v4xyzukyT5rC5SL0yZGMWX9b29nRd5hDL-efB1psqU5coX8eCSeNa_GRgT2sdB1Gq7qUKY66jD5yBx_mpjbkwg36dZOwfnQWI7rfmno3RQp9ezfbm4rHRBWuzLueU3yVoejoy750luEX5xiH1XoLULkZWURItXMbNJLLSXNnXc7iK60qA5ds8Zg8wfoaK-W17SIGr930u7qXMxofJvoRFeVQUDpCrtshIi-Kndm8-Ajvr6WCUMkLmitU4FEVoPigYUNnWUtBVEFTQVRBU0ZRRTY1ZHI4cWRfc1I0VEptSVhQVkNXWVBodkg1Zw0269"
      # @ACCESS_TOKEN = "ya29.c.b0AXv0zTPB-QblbK1DcDb1AnhPbgovuw13SQGaE8LqZt3dNVi3eogtUA42RVxYJ323pymiWVePPoFOOmgF-CJtZXdPMSSD9iAs8Z6ZDEnsnMasLbFP_OwfsjP-NRLmohhLKk-tWwP0zIylLr82bdfG7X1Va2s9osabBdzl6InFUztwhvjdP8cIl2aCchK6kzl_Y7eNVUdbvWzaAExVMR7Es09L8lAGlSw"
      @ENDPOINT_ID="3168906860459720704"
      @PROJECT_ID="276757795685"
      @API_KEY2 = 'AIzaSyCxv0PN2L6VdD3Z3zZ98SGp_Rm1YoviYso'
      @API_URL2 = "https://us-central1-aiplatform.googleapis.com/ui/projects/#{@PROJECT_ID}/locations/us-central1/endpoints/#{@ENDPOINT_ID}:predict"
      # render json: {'API_URL': @API_URL2}

      uri = URI.parse(@API_URL2)
      https = Net::HTTP.new(uri.host, uri.port)
      https.use_ssl = true
      request = Net::HTTP::Post.new(uri.request_uri)
      request["Authorization"] = "Bearer #{@ACCESS_TOKEN}"
      request["Content-Type"] = "application/json"
      response = https.request(request, @body.to_json)

      # Receive and process result
      # render json: {'response body': response.body}
      result = JSON.parse(response.body)
      @post.meta_cat_gen = result.to_s
      # render json: {'result': result}
      @disp_names = result['predictions'][0]['displayNames']
      @confs = result['predictions'][0]['confidences']
      @cats_dict = @disp_names.zip(@confs)
      @cats_dict = @cats_dict.sort_by(&:last).reverse
      @post.gen_categories = @cats_dict.to_s
      # @cats_dict = @cats_dict[0..9]
      # cats = tags['labelAnnotations']
      # processed_tags = []
      # tags.each { |x| processed_tags.append(x['description']) }
      # render json: {'disp_names': @disp_names, 'confs': @confs}    
      # Return tags to frontend as json
      # render json: {'gen_categories': processed_categories}

      # End timer for query latency calculations
      @ending = Process.clock_gettime(Process::CLOCK_MONOTONIC)
      @latency = @ending - @starting
      @post.ner_categories_latency = @latency * 1000
      @post.save

      # Return generated categories as json
      render json: {'cats_dict': @cats_dict}
    end
  end

  def dategen
    # # Start timer for query latency calculations
    # @starting = Process.clock_gettime(Process::CLOCK_MONOTONIC)

    # # Obtain post description text
    # @post = Post.find(params[:id])
    # @raw_des = @post.content

    # # Clean data

    # # POST request to Java model
    # @API_URL = "https://aiextractdate-scexlpt36a-as.a.run.app/"
    # uri = URI.parse(@API_URL)
    # https = Net::HTTP.new(uri.host, uri.port)
    # https.use_ssl = true
    # request = Net::HTTP::Post.new(uri.request_uri)
    # request["Content-Type"] = "application/json"
    # response = https.request(request, @body.to_json)

    # # # Receive and process result
    # # render json: {'response body': response.body}
    # result = JSON.parse(response.body)
    # @post.meta_label_detection = result.to_s
    # tags = result['responses'][0]
    # tags = tags['labelAnnotations']
    # processed_tags = []
    # tags.each { |x| processed_tags.append(x['description']) }
    # @post.gen_tags = processed_tags

    # # End timer for query latency calculations
    # @ending = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    # @latency = @ending - @starting
    # @post.ner_date_latency = @latency * 1000
    # @post.save
  end


  def titlegen

    # Obtain post description text
    begin
      @post = Post.find(params[:id])
    rescue
      render json: {"extractions": "post doesn't exist"}
    else
      @raw_des = @post.content
    @processed_des = @raw_des.delete!("^\u{0000}-\u{007F}"); 
    puts "here"
    puts @raw_des
    puts "filtered"
    puts @processed_des
    # Safe guard againt empty text description and id not existing
    if @processed_des.to_s.empty?
      render json: {'content': "content is empty"}
    else
      # Consruct request body
      @body = {
        "instances": {
          "mimeType": "text/plain",
          "content": @processed_des 
        }
      }


      # Authenticate request to Vertex AI 
      scope = 'https://www.googleapis.com/auth/cloud-platform'

      authorizer = Google::Auth::ServiceAccountCredentials.make_creds(
        json_key_io: File.open('./monstyrxai-41a5fb651ce9.json'),
        scope: scope)

      @ACCESS_TOKEN = authorizer.fetch_access_token!
      @ACCESS_TOKEN = @ACCESS_TOKEN['access_token']
      @ACCESS_TOKEN = @ACCESS_TOKEN.gsub('.',' ')
      @ACCESS_TOKEN = @ACCESS_TOKEN.strip
      @ACCESS_TOKEN = @ACCESS_TOKEN.gsub(' ','.')

      # Send POST request to Vertex AI custom NER endpoint
      @ENDPOINT_ID="5085469976882577408"
      @PROJECT_ID="monstyrxai"
      @API_URL2 = "https://us-central1-aiplatform.googleapis.com/ui/projects/#{@PROJECT_ID}/locations/us-central1/endpoints/#{@ENDPOINT_ID}:predict"
      
      uri = URI.parse(@API_URL2)
      https = Net::HTTP.new(uri.host, uri.port)
      https.use_ssl = true
      request = Net::HTTP::Post.new(uri.request_uri)
      request["Authorization"] = "Bearer #{@ACCESS_TOKEN}"
      request["Content-Type"] = "application/json"
      response = https.request(request, @body.to_json)

      # Receive and process result from Vertex AI custom NER
      result = JSON.parse(response.body)
      @product_names = []
      @outlet_names = []
      result["predictions"].each do |extracted|
        startOffset = extracted["textSegmentStartOffsets"][0].to_i
        endOffset = extracted["textSegmentEndOffsets"][0].to_i
        extracted_phrase = @processed_des[startOffset..endOffset]
        displayName = extracted["displayNames"]

        if displayName[0] == "Product Name" 
          @product_names.append(extracted_phrase)
        elsif displayName[0] == "Outlet Location"
          @outlet_names.append(extracted_phrase)
        end
      end

      # apply regex to extract unit number, 
      @unitNumbers = @processed_des.scan(/#?[A-Z0-9]{1,3}-[A-Z0-9]{1,3}-?(?:[0-9A-Z]+)?(?:\/[A-Z0-9]+)*\)?/)
      @xPercentOffs = @processed_des.scan(/((?:\d{1,2})%(?:[-\s][Oo][Ff][Ff]!?\*?\^?)?|(?:[Ss]ave [Uu]p to|[Ss]ave|[Ee]njoy)\s?(?:of\s)?(?:\d{1,2})%)/)
      @xForYs = @processed_des.scan(/(?:[Bb][Uu][Yy] |[Gg][Ee][Tt] )?[0-9][-|\s](?:[Ff]or|[Ii]n)[-|\s][0-9]/)
      @moneyValues = @processed_des.scan(/((?:[Ss]ave [Uu]p to |[Ss]ave |[Uu]nder |[Ww]orth |[Ww]orth up to |[Aa]t )?\$[\d,]+(?:\.\d*)?(?:\*)?[-|\s]?(?:[Ff][Oo][Rr])?)/)

      if @unitNumbers.blank?
        @unitNumbers = []
      end
      if @xPercentOffs.blank?
        @xPercentOffs = []
      end
      if @xForYs.blank?
        @xForYs = []
      end
      if @moneyValues.blank?
        @moneyValues = []
      end

      puts @unitNumbers
      puts @xPercentOffs
      puts @xForYs
      puts @moneyValues
      # , "unitNumbers": @unitNumbers, "xPercentOffs": @xPercentOffs, "xForYs": @xForYs, "moneyValues": @moneyValues

      render json: {"extractions": {"product_names": @product_names.flatten, "outlet_names": @outlet_names.flatten, "unitNumbers": @unitNumbers.flatten, "xPercentOffs": @xPercentOffs.flatten, "xForYs": @xForYs.flatten, "moneyValues": @moneyValues.flatten}}
      end
    end
  end

  # Retrieves live posts in batches of N
  def livepostsinbatches
    end_idx = (params[:batch].to_i * 15) - 1
    start_idx = end_idx - 14
    @posts = Post.where("status = 'live'").order(updated_at: :desc)
    @posts = @posts[start_idx..end_idx]
    #.first(params[batch])
    respond_to do |format|
      format.html { render json: @posts}
      format.json {render json: @posts}
    end
  end

  # Retrieves pending posts in batches of N
  def pendingpostsinbatches
    end_idx = (params[:batch].to_i * 15) - 1
    start_idx = end_idx - 14
    @posts = Post.where("status = 'pending'").order(updated_at: :desc)
    @posts = @posts[start_idx..end_idx]
    #.first(params[batch])
    respond_to do |format|
      format.html { render json: @posts}
      format.json {render json: @posts}
    end
  end

  # Returns number of posts in db
  def noofposts
    render json: {'noofposts': Post.count}
  end

  # Returns number of live posts in db
  def noofliveposts
    render json: {'noofliveposts': Post.where("status = 'live'").count}
  end

  # Returns number of pending posts in db
  def noofpendingposts
    render json: {'noofpendingposts': Post.where("status = 'pending'").count}
  end

  # Returns the latency of the object detection (OD) model
  def odlatency
    render json: {'odlatency': Post.average(:od_latency).to_f}
  end

  # Returns the latency of the optical character recognition (OCR) model
  def ocrlatency
    render json: {'ocrlatency': Post.average(:ocr_latency).to_f}
  end

  # Returns the latency of the NER-date model
  def nerdatelatency
    render json: {'nerdatelatency': Post.average(:ner_date_latency).to_f}
  end

  # Returns the latency of the NER-categories model
  def nercategorieslatency
    render json: {'nercategorieslatency': Post.average(:ner_categories_latency).to_f}
  end

  # Returns the latency of the NER-title model
  def nertitlelatency
    render json: {'nertitlelatency': Post.average(:ner_title_latency).to_f}
  end

  # Returns number of accepted AI/ML suggestions
  # TODO: Handle categories, tags that are stringified lists
  def acceptedaiml
    used_titles = Post.where('gen_title is not null').where("gen_title = title").count
    used_categories = Post.where('gen_categories is not null').where("gen_categories = categories").count
    used_start_dates = Post.where('gen_start_date is not null').where("gen_start_date = start_date").count
    used_end_dates = Post.where('gen_end_date is not null').where("gen_end_date = end_date").count
    used_tags = Post.where('gen_tags is not null').where("gen_tags = tags").count
    used_content = Post.where('gen_content is not null').where("gen_content = content").count

    render json: {'acceptedaiml': (used_titles + used_categories + used_start_dates + used_end_dates + used_tags + used_content).to_i}
  end

  # Returns number of unused AI/ML suggestions
  # TODO: Handle categories, tags that are stringified lists
  def rejectedaiml
    used_titles = Post.where('gen_title is not null').pluck(:gen_title).count - Post.where("gen_title = title").count
    used_categories = Post.where('gen_categories is not null').pluck(:gen_categories).count - Post.where("gen_categories = categories").count
    used_start_dates = Post.where('gen_start_date is not null').pluck(:gen_start_date).count - Post.where("gen_start_date = start_date").count
    used_end_dates = Post.where('gen_end_date is not null').pluck(:gen_end_date).count - Post.where("gen_end_date = end_date").count
    used_tags = Post.where('gen_tags is not null').pluck(:gen_tags).count - Post.where("gen_tags = tags").count
    used_content = Post.where('gen_content is not null').pluck(:gen_content).count - Post.where("gen_content = content").count

    render json: {'rejectedaiml': (used_titles + used_categories + used_start_dates + used_end_dates + used_tags + used_content).to_i}
  end

  # GET /posts/1 or /posts/1.json
  def show
    render json: @post
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts or /posts.json
  def create
    @post = Post.new post_params
    image = params[:image]

    if @post.save
      if image
        @post.image.attach image if image
        @post.images = url_for(@post.image)
        @post.save
      end
      # redirect_to posts_path, notice: "Post was successfully uploaded."
      render json: @post
    else
      flash.now[:alert] = "Post could not be saved."
      render :new
    end
  end

  # PATCH/PUT /posts/1 or /posts/1.json
  def update
    # respond_to do |format|
    if @post.update(post_params)
      # format.html { redirect_to post_url(@post), notice: "Post was successfully updated." }
      # format.json { render :show, status: :ok, location: @post }
      render json: @post
    else
      # format.html { render :edit, status: :unprocessable_entity }
      # format.json { render json: @post.errors, status: :unprocessable_entity }
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1 or /posts/1.json
  def destroy
    id = @post
    @post.destroy
    render json: id

    # respond_to do |format|
    #   format.html { redirect_to posts_url, notice: "Post was successfully destroyed." }
    #   format.json { head :no_content }
    # end
  end

  def latest
    @post = Post.last
    render json: @post.to_json
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow developer accounts to access certain features
    def authenticate_developer
      if @current_user.account_type == "developer"
        # access granted
      else
        # raise "This is an exception"
        render json: { errors: "Unauthorized" }, status: :unauthorized
      end
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.permit(:title, :image, :sp_id, :pid, :status, :gen_title, :gen_categories, :categories, :gen_start_date, :start_date, :gen_end_date, :end_date, :gen_tags, :tags, :od_image, :ocr_image, :gen_content, :images, :content, :score, :od_latency, :ocr_latency, :ner_date_latency, :ner_categories_latency, :ner_title_latency, :meta_label_detection, :meta_cat_gen, :meta_date_gen, :meta_title_gen)
    end
end