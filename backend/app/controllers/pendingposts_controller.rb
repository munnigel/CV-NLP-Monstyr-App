class PendingpostsController < ApplicationController
  before_action :set_pendingpost, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token


  # GET /pendingposts
  def index
    @pendingposts = Pendingpost.all
    respond_to do |format|
      format.html {render json: @pendingposts}
      format.json {render json: @pendingposts}
    end
  end

  # GET /pendingposts/1
  def show
  end

  # GET /pendingposts/new
  def new
    @pendingpost = Pendingpost.new
  end

  # GET /pendingposts/1/edit
  def edit
  end

  # POST /pendingposts
  def create
    respond_to do |format|

      @pendingpost = Pendingpost.new(pendingpost_params)
      format.html { redirect_to @pendingpost, notice: 'Document was successfully updated.' }
      format.json { render json: @pendingpost, status: :ok}
      @pendingpost.save
    end

    # if @pendingpost.save
    #   redirect_to @pendingpost, notice: 'Pendingpost was successfully created.'
    # else
    #   render :new
    # end
  end

  # PATCH/PUT /pendingposts/1
  # def update
  #   if @pendingpost.update(pendingpost_params)
  #     redirect_to @pendingpost, notice: 'Pendingpost was successfully updated.'
  #   else
  #     render :edit
  #   end
  # end
  def update
    respond_to do |format|
      if @pendingpost.update(pendingpost_params)
        format.html { redirect_to @pendingpost, notice: 'Document was successfully updated.' }
        format.json { render json: @pendingpost, status: :ok}
      else
        format.html { render :edit }
        format.json { render json: @pendingpost.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pendingposts/1
  def destroy
    @pendingpost = Pendingpost.find(params[:id])
    @pendingpost.destroy
    

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pendingpost
      @pendingpost = Pendingpost.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def pendingpost_params
      params.require(:pendingpost).permit(:score, :imgUrl, :title, :description)
    end
end