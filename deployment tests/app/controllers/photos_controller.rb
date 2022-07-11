class PhotosController < ApplicationController
  # skip_before_action :verify_authenticity_token
  before_action :set_photo, only: [:show, :edit, :update, :destroy]

  def index
    @photos = Photo.all
    # respond_to do |format|
    #   format.html { render json: @photos}
    #   format.json {render json: @photos}
    # end
  end

  def allphotosjson
    @photos = Photo.all
    respond_to do |format|
      format.html { render json: @photos}
      format.json {render json: @photos}
    end
  end

  def show
    # render json: @photo
  end

  def new
    @photo = Photo.new
  end

  def edit
  end

  def create
    @photo = Photo.new photo_params
    image = params[:photo][:image]
    caption = params[:photo][:caption]

    if @photo.save
      @photo.image.attach image if image
      @photo.ImgUrl = url_for(@photo.image)
      @photo.save
      redirect_to photos_path, notice: "Photo was successfully uploaded."
    else
      flash.now[:alert] = "Photo could not be saved."
      render :new
    end
  end

  # def create
  #   @user = get_current_user()
  #   params[:user_id] = @user.id

  #   @post = Post.create(post_params())
  #   respond_to_post()
  # end

  def update
    respond_to do |format|
      if @photo.update photo_params
        format.html { redirect_to @photo, notice: "Photo was successfully updated." }
        format.json { render :show, status: :ok, location: @photo }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @photo.errors, status: :unprocessable_entity }
      end
    end
  end

  # def destroy
  #   @photo.destroy
  #   # @photo.image.purge
  #   # redirect_to photos_path, notice: "Photo successfully deleted"
  # end

  def destroy
    @photo.image.purge
    @photo.destroy

    respond_to do |format|
      format.html { redirect_to photos_path, notice: "Photo was successfully deleted." }
      format.json { head :no_content }
    end
  end

  private

  def set_photo
    @photo = Photo.find params[:id]
  end

  def photo_params
    params.require(:photo).permit(:caption, :image)
  end
end
