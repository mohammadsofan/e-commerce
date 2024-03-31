import React from "react";
import Stars from "../../../products/components/Stars/Stars";
import style from "./Reviews.module.css";
import CreateReview from "../createReview/CreateReview";
export default function Reviews({ reviews, productId, setRerender }) {
  return (
    <section className="mt-4">
      <h2>Reviews</h2>
      <div className="d-flex flex-column gap-3 p-3 border rounded">
        {reviews.map((review) => (
          <div className="p-3 border d-flex gap-3 rounded" key={review._id}>
            <div className={style.imgContainer}>
              <img src={review.createdBy.image.secure_url} alt="" />
            </div>
            <div className="d-flex flex-column gap-1 w-100">
              <div className="d-flex justify-content-between flex-wrap">
                <span className="fw-bold">{review.createdBy.userName}</span>
                <span className={style.textSmall}>
                  {review.createdAt.slice(0, 10)}
                </span>
              </div>
              <Stars num={parseInt(review.rating)} />

              <div className="d-flex flex-column">
                <p className="comment m-0">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
        <CreateReview productId={productId} setRerender={setRerender} />
      </div>
    </section>
  );
}
