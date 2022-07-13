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

  # Retrieves live posts in batches of N
  def livepostsinbatches
    @posts = Post.where("status = 'live'")
    #.first(params[batch])
    respond_to do |format|
      format.html { render json: @posts}
      format.json {render json: @posts}
    end
  end

  # Retrieves pending posts in batches of N
  def pendingpostsinbatches
    @posts = Post.where("status = 'pending'")
    #.first(params[batch])
    respond_to do |format|
      format.html { render json: @posts}
      format.json {render json: @posts}
    end
  end


  # Returns number of posts in db
  def noofposts
    render json: Post.count
  end

  # Returns number of live posts in db
  def noofliveposts
    render json: Post.where("status = 'live'").count
  end

  # Returns number of pending posts in db
  def noofpendingposts
    render json: Post.where("status = 'pending'").count
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
    @post.destroy

    respond_to do |format|
      format.html { redirect_to posts_url, notice: "Post was successfully destroyed." }
      format.json { head :no_content }
    end
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
