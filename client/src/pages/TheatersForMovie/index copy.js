import React, { useEffect } from "react";
import { Col, message, Row, Table, Form  } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllMovies, GetMovieById } from "../../apicalls/movies";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TheatersForMovie() {
 // get date from query string
 //const tempDate = new URLSearchParams(window.location.search).get("date");
 /*console.log(tempDate);
 const [date, setDate] = React.useState(
  moment().format(tempDate) || moment().format("DD-MM-YYYY")
);*/
 const [date, setDate] = React.useState( moment().format("DD-MM-YYYY"));

  const [movie, setMovie] = React.useState([]); //3
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetMovieById(params.id);
      if (response.success) {
        setMovie(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    movie && (
      <div>
        {/* movie information */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl uppercase">
              {movie.title} ({movie.language})
            </h1>
            <h1 className="text-md">Duration : {movie.duration} mins</h1>
            <h1 className="text-md">
              Release Date : {moment(movie.releaseDate).format("DD-MM-YYYY")}
            </h1>
            <h1 className="text-md">Genre : {movie.genre}</h1>
          </div>

          <div>
            <h1 className="text-md">Select Date</h1>

            <DatePicker
            dateFormat="dd-MM-yyyy"
            onKeyDown={(e) => {
              e.preventDefault();
            }}
            selected={date}
            onChange={date => setDate(date)}
            //min={moment().format("DD.MM.YYYY")} //09:45
            //selected={date}
                 
             /> 
             

            {/*<input
              type="date"
              min={moment().format("YYYY-MM-DD")}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                navigate(`/movie/${params.id}?date=${e.target.value}`);
              }}
            />*/}
          </div>
        </div>
      </div>
    )
  );
}
export default TheatersForMovie;