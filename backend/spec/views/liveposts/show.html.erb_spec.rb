require 'rails_helper'

RSpec.describe "liveposts/show", type: :view do
  before(:each) do
    @livepost = assign(:livepost, Livepost.create!(
      imgUrl: "Img Url",
      title: "Title",
      category: "Category",
      promotionDate: "Promotion Date",
      description: "Description"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Img Url/)
    expect(rendered).to match(/Title/)
    expect(rendered).to match(/Category/)
    expect(rendered).to match(/Promotion Date/)
    expect(rendered).to match(/Description/)
  end
end
