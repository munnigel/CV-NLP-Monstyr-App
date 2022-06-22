require 'rails_helper'

RSpec.describe "pendingposts/new", type: :view do
  before(:each) do
    assign(:pendingpost, Pendingpost.new(
      score: "MyString",
      imgUrl: "MyString",
      title: "MyString",
      description: "MyString"
    ))
  end

  it "renders new pendingpost form" do
    render

    assert_select "form[action=?][method=?]", pendingposts_path, "post" do

      assert_select "input[name=?]", "pendingpost[score]"

      assert_select "input[name=?]", "pendingpost[imgUrl]"

      assert_select "input[name=?]", "pendingpost[title]"

      assert_select "input[name=?]", "pendingpost[description]"
    end
  end
end
