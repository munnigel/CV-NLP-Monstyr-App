require 'rails_helper'

RSpec.describe "liveposts/edit", type: :view do
  before(:each) do
    @livepost = assign(:livepost, Livepost.create!(
      imgUrl: "MyString",
      title: "MyString",
      category: "MyString",
      promotionDate: "MyString",
      description: "MyString"
    ))
  end

  it "renders the edit livepost form" do
    render

    assert_select "form[action=?][method=?]", livepost_path(@livepost), "post" do

      assert_select "input[name=?]", "livepost[imgUrl]"

      assert_select "input[name=?]", "livepost[title]"

      assert_select "input[name=?]", "livepost[category]"

      assert_select "input[name=?]", "livepost[promotionDate]"

      assert_select "input[name=?]", "livepost[description]"
    end
  end
end
