require "rails_helper"

RSpec.describe PendingpostsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/pendingposts").to route_to("pendingposts#index")
    end

    it "routes to #new" do
      expect(get: "/pendingposts/new").to route_to("pendingposts#new")
    end

    it "routes to #show" do
      expect(get: "/pendingposts/1").to route_to("pendingposts#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/pendingposts/1/edit").to route_to("pendingposts#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/pendingposts").to route_to("pendingposts#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/pendingposts/1").to route_to("pendingposts#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/pendingposts/1").to route_to("pendingposts#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/pendingposts/1").to route_to("pendingposts#destroy", id: "1")
    end
  end
end
