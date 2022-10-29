import Nav from '../components/Nav/index';
import Footer from '../components/Footer/index';
import MyLearningTabs from '../components/MyLearningTabs/index'
import { useEffect, useState } from 'react';
import axios from 'axios';

function MyLearning(){
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        axios.get('http://localhost:8081/courses/test', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then((courses) => {
            console.log('cursos por usuario modif:', courses.data.data)
            setCourses(courses.data.data)
        })
        .catch(err => console.log(err))   
        .finally(()=>{
            console.log('Este es el finally');
            setLoading(false);
          })
    },[])

    return(
        <div>
            <Nav />
            {/* <MyLearningTabs /> */}
            {loading?<p>No hay datos</p>:courses.map((course) => (
                <>
                    <h1>{course.title}</h1>
                    <h2>{course.subtitle}</h2>
                </>
            ))}
            {typeof courses}
            <Footer/>
        </div>

    )
}
export default MyLearning;