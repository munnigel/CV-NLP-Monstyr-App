require 'rails_helper'

RSpec.describe "liveposts/new", type: :view do
  before(:each) do
    assign(:livepost, Livepost.new(
      imgUrl: "MyString",
      title: "MyString",
      category: "MyString",
      promotionDate: "MyString",
      description: "MyString"
    ))
  end

  it "renders new livepost form" do
    render

    assert_select "form[action=?][method=?]", liveposts_path, "post" do

      assert_select "input[name=?]", "livepost[imgUrl]"

      assert_select "input[name=?]", "livepost[title]"

      assert_select "input[name=?]", "livepost[category]"

      assert_select "input[name=?]", "livepost[promotionDate]"

      assert_select "input[name=?]", "livepost[description]"
    end
  end
end
