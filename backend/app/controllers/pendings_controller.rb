class PendingsController < ApplicationController
  before_action :set_pending, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token

  # GET /pendings or /pendings.json
  def index
    @pendings = Pending.all
  end

  # GET /pendings/1 or /pendings/1.json
  def show
  end

  # GET /pendings/new
  def new
    @pending = Pending.new
  end

  # GET /pendings/1/edit
  def edit
  end

  # POST /pendings or /pendings.json
  def create
    @pending = Pending.new(pending_params)

    respond_to do |format|
      if @pending.save
        format.html { redirect_to pending_url(@pending), notice: "Pending was successfully created." }
        format.json { render :show, status: :created, location: @pending }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @pending.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pendings/1 or /pendings/1.json
  def update
    respond_to do |format|
      if @pending.update(pending_params)
        format.html { redirect_to pending_url(@pending), notice: "Pending was successfully updated." }
        format.json { render :show, status: :ok, location: @pending }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @pending.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pendings/1 or /pendings/1.json
  def destroy
    @pending.destroy

    respond_to do |format|
      format.html { redirect_to pendings_url, notice: "Pending was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pending
      @pending = Pending.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def pending_params
      params.require(:pending).permit(:imgUrl, :title, :category, :promotionDate, :description)
    end
end
