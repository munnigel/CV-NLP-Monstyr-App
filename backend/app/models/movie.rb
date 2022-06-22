class Movie < ActiveRecord::Base

  def self.with_ratings(ratings_list)
    # if ratings_list is an array such as ['G', 'PG', 'R'], retrieve all
    #  movies with those ratings
    # if ratings_list is nil, retrieve ALL movies

    result = []

    if ratings_list == []
      result = Movie.all
    else
      result = Movie.where(rating: ratings_list)
    end
    return result
  end

  def self.all_ratings
    ['G','PG','PG-13','R']
  end

  def self.ratings
    ['G','PG','PG-13','R']
  end

end