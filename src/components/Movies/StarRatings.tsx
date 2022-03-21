import { AxiosInstance } from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { routes } from "../../helpers/apiCommunication";

interface StarRatingsProps {
  movieId: number;
  movieRating: number;
  authenticatedRequest: AxiosInstance;
}

export const StarRatings: React.FC<StarRatingsProps> = ({
  movieId,
  movieRating,
  authenticatedRequest,
}) => {
  const starRatings = [5, 4, 3, 2, 1];

  const handleChange = async (starRating: number) => {
    try {
      await authenticatedRequest.patch(routes.movies.REVIEW, {
        movieId: movieId,
        rating: starRating,
      });
      toast.success("Rating Added Successfully!");
    } catch (error) {
      toast.error("Error sending rating to API");
    }
  };

  return (
    <div>
      <span>Rating: </span>
      <div className="star-rating">
        {starRatings.map((starRating, index) => {
          return (
            <React.Fragment key={index}>
              <input
                id={`star-${starRating}-${movieId}`}
                className={`star-${starRating}-${movieId}`}
                type="radio"
                name={`rating-${movieId}`}
                value={`star-${starRating}-${movieId}`}
                defaultChecked={starRating === movieRating}
                onClick={() => handleChange(starRating)}
              ></input>
              <label
                htmlFor={`star-${starRating}-${movieId}`}
                title={`${starRating} stars`}
              >
                <FaStar className="active" aria-hidden="true" />
              </label>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
