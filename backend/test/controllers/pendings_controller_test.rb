require "test_helper"

class PendingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @pending = pendings(:one)
  end

  test "should get index" do
    get pendings_url
    assert_response :success
  end

  test "should get new" do
    get new_pending_url
    assert_response :success
  end

  test "should create pending" do
    assert_difference("Pending.count") do
      post pendings_url, params: { pending: { category: @pending.category, description: @pending.description, imgUrl: @pending.imgUrl, promotionDate: @pending.promotionDate, title: @pending.title } }
    end

    assert_redirected_to pending_url(Pending.last)
  end

  test "should show pending" do
    get pending_url(@pending)
    assert_response :success
  end

  test "should get edit" do
    get edit_pending_url(@pending)
    assert_response :success
  end

  test "should update pending" do
    patch pending_url(@pending), params: { pending: { category: @pending.category, description: @pending.description, imgUrl: @pending.imgUrl, promotionDate: @pending.promotionDate, title: @pending.title } }
    assert_redirected_to pending_url(@pending)
  end

  test "should destroy pending" do
    assert_difference("Pending.count", -1) do
      delete pending_url(@pending)
    end

    assert_redirected_to pendings_url
  end
end
