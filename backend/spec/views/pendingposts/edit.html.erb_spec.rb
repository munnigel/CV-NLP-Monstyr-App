require 'rails_helper'

RSpec.describe "pendingposts/edit", type: :view do
  before(:each) do
    @pendingpost = assign(:pendingpost, Pendingpost.create!(
      score: "MyString",
      imgUrl: "MyString",
      title: "MyString",
      description: "MyString"
    ))
  end

  it "renders the edit pendingpost form" do
    render

    assert_select "form[action=?][method=?]", pendingpost_path(@pendingpost), "post" do

      assert_select "input[name=?]", "pendingpost[score]"

      assert_select "input[name=?]", "pendingpost[imgUrl]"

      assert_select "input[name=?]", "pendingpost[title]"

      assert_select "input[name=?]", "pendingpost[description]"
    end
  end
end
