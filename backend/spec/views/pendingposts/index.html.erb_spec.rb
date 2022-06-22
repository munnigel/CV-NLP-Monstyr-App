require 'rails_helper'

RSpec.describe "pendingposts/index", type: :view do
  before(:each) do
    assign(:pendingposts, [
      Pendingpost.create!(
        score: "Score",
        imgUrl: "Img Url",
        title: "Title",
        description: "Description"
      ),
      Pendingpost.create!(
        score: "Score",
        imgUrl: "Img Url",
        title: "Title",
        description: "Description"
      )
    ])
  end

  it "renders a list of pendingposts" do
    render
    assert_select "tr>td", text: "Score".to_s, count: 2
    assert_select "tr>td", text: "Img Url".to_s, count: 2
    assert_select "tr>td", text: "Title".to_s, count: 2
    assert_select "tr>td", text: "Description".to_s, count: 2
  end
end
