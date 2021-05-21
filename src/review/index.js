import express from "express";
import createError from "http-error";
import uniqid from 'uniqid'

import { getReview } from "../library/fs-tool.js";
import {writeReview} from "../library/fs-tool.js"
const reviewRoutes = express.Router();

reviewRoutes.get("/", async (req, res, next) => {
	try {
		const reviews = await getReview();
		res.send(reviews);
	} catch (error) {
		next(error);
	}
});

reviewRoutes.post("/", async (req, res, next) => {
	try {
		const reviews = await getReview();
		const newReview = {
			_id: uniqid(),
			...req.body,
			createdAt: new Date(),
		};
		reviews.push(newReview);
		writeReview(reviews);
		res.send(newReview);
	} catch (error) {
		next(error);
	}
});

reviewRoutes.get("/:id", async (req, res, next) => {
	try {
		const reviews = await getReview();

		const targetReview = reviews.find((review) => review._id === req.params.id);
		if (targetReview) {
			res.send(targetReview);
		} else {
			next(createError(404,`review with the id of ${req.params.id} does not exist`))
		}
	} catch (error) {
		next(error);
	}
});



reviewRoutes.put("/:id", async (req, res, next) => {
	try {
        const reviews = await getReview();
        const targetReview = reviews.find(review => review._id ===req.params.id )
        if (targetReview) {
            
        }
        const updateReview = {
			_id: req.params.id,
			...req.body,
			createdAt: targetReview.createdAt,
		};
		reviews.push(updateReview);
		writeReview(reviews);
		res.send(updateReview);
	} catch (error) {
		next(error);
	}
});

reviewRoutes.delete("/:id", async (req, res, next) => {
	try {
        const reviews = await getReview();
        const targetReview = reviews.filter(review => review._id !== req.params.id )

		writeReview(targetReview);
		res.send("Review Deleted");
	} catch (error) {
		next(error);
	}
});



export default reviewRoutes;
