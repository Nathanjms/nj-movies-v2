import { AxiosInstance } from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { routes } from "../../helpers/apiCommunication";

interface StarRatingsProps {
  movieId: number;
  movieRating: number;
  authenticatedRequest: AxiosInstance;
  overlay?: boolean;
}

export const StarRatings: React.FC<StarRatingsProps> = ({
  movieId,
  movieRating,
  authenticatedRequest,
  overlay = false
}) => {
  const starRatings = [5, 4, 3, 2, 1];
  let identifier = overlay ? "overlay" : "noOverlay"

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
                id={`star-${starRating}-${movieId}-${identifier}`}
                className={`star-${starRating}-${movieId}-${identifier}`}
                type="radio"
                name={`rating-${movieId}-${identifier}`}
                value={`star-${starRating}-${movieId}-${identifier}`}
                defaultChecked={starRating === movieRating}
                onClick={() => handleChange(starRating)}
              ></input>
              <label
                htmlFor={`star-${starRating}-${movieId}-${identifier}`}
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
