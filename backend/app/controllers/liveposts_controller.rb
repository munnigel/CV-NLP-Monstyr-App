class LivepostsController < ApplicationController
  before_action :set_livepost, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /liveposts
  def index
    @liveposts = Livepost.all
    respond_to do |format|
      format.html { render json: @liveposts}
      format.json {render json: @liveposts}
    end
  end

  # GET /liveposts/1
  def show
  end

  # GET /liveposts/new
  def new
    @livepost = Livepost.new
  end

  # GET /liveposts/1/edit
  def edit
  end

  # POST /liveposts
  def create
    @livepost = Livepost.new(livepost_params)

    if @livepost.save
      redirect_to @livepost, notice: 'Livepost was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /liveposts/1
  def update
    if @livepost.update(livepost_params)
      redirect_to @livepost, notice: 'Livepost was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /liveposts/1
  def destroy
    @livepost.destroy
    redirect_to liveposts_url, notice: 'Livepost was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_livepost
      @livepost = Livepost.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def livepost_params
      params.require(:livepost).permit(:imgUrl, :title, :category, :promotionDate, :description)
    end
end
