require 'rails_helper'

RSpec.describe "pendingposts/show", type: :view do
  before(:each) do
    @pendingpost = assign(:pendingpost, Pendingpost.create!(
      score: "Score",
      imgUrl: "Img Url",
      title: "Title",
      description: "Description"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Score/)
    expect(rendered).to match(/Img Url/)
    expect(rendered).to match(/Title/)
    expect(rendered).to match(/Description/)
  end
end
