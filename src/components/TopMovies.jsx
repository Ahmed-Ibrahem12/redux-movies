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
  }, [dispatch]);

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-6">
      {HomeMovies?.results.map(
        (mov, i) =>
          mov.vote_average > 7 && (
            <Card
              key={i}
              className="mt-6 w-[350px] m-5 mb-7 shadow-xl hover:scale-105 transition-transform duration-300"
              data-aos="fade-up"
            >
              <CardHeader color="blue-gray" className="relative h-auto">
                <img
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${mov.poster_path}`}
                  alt={mov.title}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </CardHeader>

              <CardBody className="p-4">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  {mov.title.length > 25
                    ? mov.title.slice(0, 25) + "..."
                    : mov.title}
                </Typography>

                <div className="flex justify-between items-center text-sm">
                  <p>Rate: {mov.vote_average.toFixed(1)}</p>
                  <ReactStars
                    count={5}
                    value={mov.vote_average / 2}
                    size={20}
                    color2={"#ffd700"}
                    edit={false}
                  />
                </div>
              </CardBody>

              <CardFooter className="pt-0">
                <Button
                  size="sm"
                  onClick={() => navigate(`/movies/${mov.id}`)}
                  className="w-full"
                >
                  Details
                </Button>
              </CardFooter>
            </Card>
          )
      )}
    </div>
  );
}
