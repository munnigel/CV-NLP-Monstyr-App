require 'rails_helper'

RSpec.describe "liveposts/index", type: :view do
  before(:each) do
    assign(:liveposts, [
      Livepost.create!(
        imgUrl: "Img Url",
        title: "Title",
        category: "Category",
        promotionDate: "Promotion Date",
        description: "Description"
      ),
      Livepost.create!(
        imgUrl: "Img Url",
        title: "Title",
        category: "Category",
        promotionDate: "Promotion Date",
        description: "Description"
      )
    ])
  end

  it "renders a list of liveposts" do
    render
    assert_select "tr>td", text: "Img Url".to_s, count: 2
    assert_select "tr>td", text: "Title".to_s, count: 2
    assert_select "tr>td", text: "Category".to_s, count: 2
    assert_select "tr>td", text: "Promotion Date".to_s, count: 2
    assert_select "tr>td", text: "Description".to_s, count: 2
  end
end
