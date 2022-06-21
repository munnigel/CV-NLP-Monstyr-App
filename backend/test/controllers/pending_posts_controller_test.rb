require "test_helper"

class PendingPostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @pending_post = pending_posts(:one)
  end

  test "should get index" do
    get pending_posts_url
    assert_response :success
  end

  test "should get new" do
    get new_pending_post_url
    assert_response :success
  end

  test "should create pending_post" do
    assert_difference("PendingPost.count") do
      post pending_posts_url, params: { pending_post: { description: @pending_post.description, img: @pending_post.img, score: @pending_post.score, title: @pending_post.title } }
    end

    assert_redirected_to pending_post_url(PendingPost.last)
  end

  test "should show pending_post" do
    get pending_post_url(@pending_post)
    assert_response :success
  end

  test "should get edit" do
    get edit_pending_post_url(@pending_post)
    assert_response :success
  end

  test "should update pending_post" do
    patch pending_post_url(@pending_post), params: { pending_post: { description: @pending_post.description, img: @pending_post.img, score: @pending_post.score, title: @pending_post.title } }
    assert_redirected_to pending_post_url(@pending_post)
  end

  test "should destroy pending_post" do
    assert_difference("PendingPost.count", -1) do
      delete pending_post_url(@pending_post)
    end

    assert_redirected_to pending_posts_url
  end
end
