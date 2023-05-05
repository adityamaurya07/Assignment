import {Modal} from "react-bootstrap"
import axios from "axios";
import { useEffect,useState } from "react";
import parse from 'html-react-parser'

const Firstscreen = ()=>{
  const [openModal,setModal] = useState(false)
  const [data,setData] = useState([])
  const [feilds,setFeilds] = useState({
    title:"",
    body:"",
    schedule:""
  })
    const getRequest = async () => {
       try {
        const { data } = await axios.get(
          " https://api.tvmaze.com/search/shows?q=all"
        );
        return setData(data)
       } catch (error) {
        console.log(error)
        
       }
      };
      useEffect(()=>{
        const fectchData =async ()=>{
          await getRequest()
        }
       fectchData()
      },[])
      const UiCard = ({userdata})=>{
          const url = JSON.parse(JSON.stringify(userdata.show.image));
          let rating = userdata.show.rating.average
          let imageUrl = url != null ? url.medium : null;
        const design =(
          <>
          <div className="col-md-3 mb-3">
              <div className="card">
                  <img src={imageUrl} alt="error" className="card-img-top" />
                  <span className="p-0 mt-1" style={
                    {
                      fontWeight:"bold",
                      float:"right",
                      fontSize:"10px",
                      textAlign:"center"
                    }} >
                      {userdata.show.schedule.days} Time: {userdata.show.schedule.time}
                      </span>
                  <div className="card-body">
                      <span style={{fontWeight:"bold",float:"right",fontSize:"15px",color:"red"}}>{userdata.show.status}</span>
                      <h6 className="card-title">Movie Name: {userdata.show.name}</h6>
                      <p style={{fontSize:"10px"}} className="card-text">{parse(userdata.show.summary)}
                      </p>
                      
                      <button onClick={()=>showModal(true,userdata)} className="btn btn-danger px-3 btn-sm" >Book Ticket</button>
                      <span style={{
                        fontWeight:"bold",
                        float:"right",
                        fontSize:"10px"
                        }}>
                          Rating:  {rating ? userdata.show.rating.average :`No Rating`}
                      </span> <br />
                      <span style={{
                        fontWeight:"bold",
                        float:"right",
                        fontSize:"10px"
                        }}>
                          Premiered: {userdata.show.premiered}
                      </span>
                  </div>
              </div>
          </div>
          </>
        )
        return design
      }
    
      const showModal = (boolean,userdata)=>{
        let summary = parse(userdata.show.summary)
        console.log(userdata)
        return (
          setModal(true),
          setFeilds({
            title:userdata.show.name,
            body:summary.props.children,
            schedule:userdata.show.premiered
          })
        )
      }
    const design = (
        <>
       <div className="container py-4">
       <div className="row">
       {
        data.map((items)=>{
          return <UiCard userdata={items} key={items.score}/>
        })
       }
       </div>
       </div>     
      <Modal show={openModal} onHide={()=>setModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Book Your Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div className="mb-3">
                    <label>Movie Name</label>
                    <input className='form-control' type="text" name='title' value={feilds.title}  readOnly />
                </div>
                <div className="mb-3">
                    <label>Summary</label>
                  <textarea name="body"  rows="3" className="form-control" value={feilds.body} readOnly></textarea>
                </div>
               <div className="mb-3">
               <label>schedule</label>
                    <input className='form-control' type="text" name='title' value={feilds.schedule}  readOnly />
               </div>
                <button className="btn btn-danger">Book</button>
            </form>
        </Modal.Body>
      </Modal>
        </>
    )
    return design
}

export default Firstscreen