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
import ReactStars from "react-stars";
import { getSeriesHome } from "../redux/Slices/homeSeries";
import { useNavigate } from "react-router-dom";

export default function TopSeries() {
  const { HomeSeries } = useSelector((state) => state.homeSeries);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSeriesHome());
  }, [dispatch]);

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-6">
      {HomeSeries?.results.map(
        (ser, i) =>
          ser.vote_average > 7 && (
            <Card
              key={i}
              className="mt-6 w-[350px] m-5 mb-7 shadow-xl hover:scale-105 transition-transform duration-300"
              data-aos="fade-up"
            >
              <CardHeader color="blue-gray" className="relative h-auto">
                <img
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ser.poster_path}`}
                  alt={ser.name}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </CardHeader>

              <CardBody className="p-4">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  {ser.name.length > 25
                    ? ser.name.slice(0, 25) + "..."
                    : ser.name}
                </Typography>

                <div className="flex justify-between items-center text-sm">
                  <p>Rate: {ser.vote_average.toFixed(1)}</p>
                  <ReactStars
                    count={5}
                    value={ser.vote_average / 2}
                    size={20}
                    color2={"#ffd700"}
                    edit={false}
                  />
                </div>
              </CardBody>

              <CardFooter className="pt-0">
                <Button
                  size="sm"
                  onClick={() => navigate(`/series/${ser.id}`)}
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
