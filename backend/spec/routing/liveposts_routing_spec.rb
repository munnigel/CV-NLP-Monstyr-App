require "rails_helper"

RSpec.describe LivepostsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/liveposts").to route_to("liveposts#index")
    end

    it "routes to #new" do
      expect(get: "/liveposts/new").to route_to("liveposts#new")
    end

    it "routes to #show" do
      expect(get: "/liveposts/1").to route_to("liveposts#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/liveposts/1/edit").to route_to("liveposts#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/liveposts").to route_to("liveposts#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/liveposts/1").to route_to("liveposts#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/liveposts/1").to route_to("liveposts#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/liveposts/1").to route_to("liveposts#destroy", id: "1")
    end
  end
end
