require "application_system_test_case"

class PendingPostsTest < ApplicationSystemTestCase
  setup do
    @pending_post = pending_posts(:one)
  end

  test "visiting the index" do
    visit pending_posts_url
    assert_selector "h1", text: "Pending posts"
  end

  test "should create pending post" do
    visit pending_posts_url
    click_on "New pending post"

    fill_in "Description", with: @pending_post.description
    fill_in "Img", with: @pending_post.img
    fill_in "Score", with: @pending_post.score
    fill_in "Title", with: @pending_post.title
    click_on "Create Pending post"

    assert_text "Pending post was successfully created"
    click_on "Back"
  end

  test "should update Pending post" do
    visit pending_post_url(@pending_post)
    click_on "Edit this pending post", match: :first

    fill_in "Description", with: @pending_post.description
    fill_in "Img", with: @pending_post.img
    fill_in "Score", with: @pending_post.score
    fill_in "Title", with: @pending_post.title
    click_on "Update Pending post"

    assert_text "Pending post was successfully updated"
    click_on "Back"
  end

  test "should destroy Pending post" do
    visit pending_post_url(@pending_post)
    click_on "Destroy this pending post", match: :first

    assert_text "Pending post was successfully destroyed"
  end
end
