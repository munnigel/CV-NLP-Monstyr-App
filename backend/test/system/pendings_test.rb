require "application_system_test_case"

class PendingsTest < ApplicationSystemTestCase
  setup do
    @pending = pendings(:one)
  end

  test "visiting the index" do
    visit pendings_url
    assert_selector "h1", text: "Pendings"
  end

  test "should create pending" do
    visit pendings_url
    click_on "New pending"

    fill_in "Category", with: @pending.category
    fill_in "Description", with: @pending.description
    fill_in "Imgurl", with: @pending.imgUrl
    fill_in "Promotiondate", with: @pending.promotionDate
    fill_in "Title", with: @pending.title
    click_on "Create Pending"

    assert_text "Pending was successfully created"
    click_on "Back"
  end

  test "should update Pending" do
    visit pending_url(@pending)
    click_on "Edit this pending", match: :first

    fill_in "Category", with: @pending.category
    fill_in "Description", with: @pending.description
    fill_in "Imgurl", with: @pending.imgUrl
    fill_in "Promotiondate", with: @pending.promotionDate
    fill_in "Title", with: @pending.title
    click_on "Update Pending"

    assert_text "Pending was successfully updated"
    click_on "Back"
  end

  test "should destroy Pending" do
    visit pending_url(@pending)
    click_on "Destroy this pending", match: :first

    assert_text "Pending was successfully destroyed"
  end
end
