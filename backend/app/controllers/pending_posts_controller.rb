class PendingPostsController < ApplicationController
  before_action :set_pending_post, only: %i[ show edit update destroy ]

  # GET /pending_posts or /pending_posts.json
  def index
    @pending_posts = PendingPost.all
  end

  # GET /pending_posts/1 or /pending_posts/1.json
  def show
  end

  # GET /pending_posts/new
  def new
    @pending_post = PendingPost.new
  end

  # GET /pending_posts/1/edit
  def edit
  end

  # POST /pending_posts or /pending_posts.json
  def create
    @pending_post = PendingPost.new(pending_post_params)

    respond_to do |format|
      if @pending_post.save
        format.html { redirect_to pending_post_url(@pending_post), notice: "Pending post was successfully created." }
        format.json { render :show, status: :created, location: @pending_post }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @pending_post.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pending_posts/1 or /pending_posts/1.json
  def update
    respond_to do |format|
      if @pending_post.update(pending_post_params)
        format.html { redirect_to pending_post_url(@pending_post), notice: "Pending post was successfully updated." }
        format.json { render :show, status: :ok, location: @pending_post }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @pending_post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pending_posts/1 or /pending_posts/1.json
  def destroy
    @pending_post.destroy

    respond_to do |format|
      format.html { redirect_to pending_posts_url, notice: "Pending post was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pending_post
      @pending_post = PendingPost.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def pending_post_params
      params.require(:pending_post).permit(:score, :img, :title, :description)
    end
end
