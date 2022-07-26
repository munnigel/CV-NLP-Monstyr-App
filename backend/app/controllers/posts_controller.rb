class PostsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_post, only: [:show, :edit, :update, :destroy]

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

    # Obtain image URL
    @post = Post.find(params[:id])
    @img_urls = @post.images.split(',')
    @raw_img_url = @img_urls.first
    @raw_img_url = @raw_img_url[1..-1]
    # render json: {'IMG_URL_1': @raw_img_url}

    # Generate appropriate request.json
    @body = {
      "requests": [
          {
            "image": {
              "source": {
                  "imageUri": "gs://rubyduckies_cloudstorage/91g7pxvfrk2k75cfa3vg79zm0tem"
              }
            },
            "features": [
              {
                "type": "LABEL_DETECTION",
                "maxResults": 10
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
    tags = result['responses'][0]
    tags = tags['labelAnnotations']
    processed_tags = []
    tags.each { |x| processed_tags.append(x['description']) }

    # Return tags to frontend as json
    render json: {'tags': processed_tags}
  end

  # Retrieves live posts in batches of N
  def livepostsinbatches
    end_idx = (params[:batch].to_i * 15) - 1
    start_idx = end_idx - 14
    @posts = Post.where("status = 'live'")
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
    @posts = Post.where("status = 'pending'")
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
      @post.image.attach image if image
      @post.images = url_for(@post.image)
      @post.save
      # redirect_to posts_path, notice: "Post was successfully uploaded."
      render json: @post
    else
      flash.now[:alert] = "Post could not be saved."
      render :new
    end
  end

  # PATCH/PUT /posts/1 or /posts/1.json
  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to post_url(@post), notice: "Post was successfully updated." }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
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

    # Only allow a list of trusted parameters through.
    def post_params
      params.permit(:title, :image, :sp_id, :pid, :status, :gen_title, :gen_categories, :categories, :gen_start_date, :start_date, :gen_end_date, :end_date, :gen_tags, :tags, :od_image, :ocr_image, :gen_content, :images, :content, :score, :od_latency, :ocr_latency, :ner_date_latency, :ner_categories_latency, :ner_title_latency)
    end
end
