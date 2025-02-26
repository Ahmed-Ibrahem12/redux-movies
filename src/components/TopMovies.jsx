import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { getHomeMovies } from "../redux/Slices/homeMovies";
import ReactStars from "react-stars";
import { useNavigate } from "react-router-dom";

export default function TopMovies() {
  const { HomeMovies } = useSelector((state) => state.homeMovies);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeMovies());
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center">
      {HomeMovies?.results.map(
        (mov, i) =>
          mov.vote_average > 7 && (
            <Card key={i} className="mt-6 w-96 m-5 mb-7">
              <CardHeader color="blue-gray" className="relative h-auto">
                <img
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${mov.poster_path}`}
                  alt="card-image"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {mov.title}
                </Typography>
                <div className="flex justify-between items-center">
                  <p>Rate : {mov.vote_average}</p>
                  <ReactStars
                    count={5}
                    value={mov.vote_average}
                    size={24}
                    color2={"#ffd700"}
                  />
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button onClick={() => navigate(`/movies/${mov.id}`)}>
                  Details
                </Button>
              </CardFooter>
            </Card>
          )
      )}
    </div>
  );
}
