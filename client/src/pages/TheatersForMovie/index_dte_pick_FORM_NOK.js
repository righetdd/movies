import React, { useEffect } from "react";
import { Col, message, Row, Table, Form } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllMovies, GetMovieById } from "../../apicalls/movies";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let now = moment();


function TheatersForMovie() {
   // get date from query string
   const tempDate = new URLSearchParams(window.location.search).get("date");
   /*const [searchDate, setSearchDate] = React.useState(
     tempDate || moment().format("DD-MM-YYYY")
   );*/
  console.log(tempDate);
  const [searchDate, setSearchDate] = React.useState(now.format("DD-MM-YYYY"));
  
  //const [searchDate, setSearchDate] = React.useState(null);

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
      <Form>
        <Row gutter={16}>
        <Col span={20}>
        <Form.Item >
          <div>
            <h1 className="text-2xl uppercase">
              <h1>TEST</h1>
              {movie.title} ({movie.language})
            </h1>
            <h1 className="text-md">Duration : {movie.duration} mins</h1>
            <h1 className="text-md">
              Release Date : {moment(movie.releaseDate).format("DD-MM-YYYY")}
            </h1>
            <h1 className="text-md">Genre : {movie.genre}</h1>
          </div>
        </Form.Item>
        </Col>
        <Col span={4}>
        <Form.Item label="searchDate" name="searchDate" >
        <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={searchDate}
                //onChange={date => {setSearchDate(date); navigate(`/movie/${params.id}?date=${searchDate}`)}}
                //(date) => handleChange{(target: { name: "registrationDate", value: date }})
               // {(date) => handleChange({target: { name: "registrationDate", value: date }})}



                //onChange={e => { this.functionOne(e); this.functionTwo() }}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
               //peekNextMonth
                //showYearDropdown
                //dropdownMode="select"
                //autoComplete='off'
                //placeholderText='Enter release date'
              />
        </Form.Item>
        </Col>
        </Row>
      </Form>
    )
  );
}
export default TheatersForMovie;