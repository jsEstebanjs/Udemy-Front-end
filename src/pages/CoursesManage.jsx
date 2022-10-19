import { useState, useEffect } from "react";
import TitleManageCourse from "../components/TitleManageCourse";
import InputTitleLanding from "../components/InputTItleLanding";
import ReactQuill from 'react-quill';
import SelectPricing from "../components/ComponentPricing";
import OptionsPricing from "../components/ComponentPricing/options";
import PromotionalSource from "../components/PromotionalSources";
import { useDispatch , useSelector} from 'react-redux';
import { SetTitle, SetSubTitle, SetDescription,SetLevel,SetCategory,SetTeaching,Send,  
    SetLearn,SetRequirements,SetThisCourse,Add,Delete,Reorder,SendLearners,
    SetPrice} from '../store/CreateCourse.Slice';
import LoaderCreateCourse from "../components/LoaderCreateCourse";
import CoursesManageNav from '../components/CoursesManageNav';
import axios from 'axios';
import LearnInYourCourse from "../components/LearnInYourCourse";

function CoursesManage(){

    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    const arrs = useSelector((state) => state.CreateCourse)

    //para descripcion
    const [value, setValue] = useState('');
    const mediator = (e)=>{
      setValue(e)
      dispatch(SetDescription(e))
    }
      const modules = {
        toolbar: [
          ['bold', 'italic'],
          [{'list': 'ordered'}, {'list': 'bullet'}]
        ],
      }
      const obj = {
        SetTitle,
        SetSubTitle,
        SetDescription,
        SetLevel,
        SetCategory,
        SetTeaching,
        Send,
        SetLearn,
        SetRequirements,
        SetThisCourse,
        SendLearners,
        SetPrice
      }

    useEffect(() => {
        axios.get(`https://dummyjson.com/comments`)
          .then((res) => {
            console.log(res.data)
          }).catch((err) => {
            alert(`ups hay un error ${err.message}, comuniquese a servicio al cliente 31054897466`)
          }).finally(() => {
            setLoading(false)
          })
      }, [])

    return(
        <div className='main-container-courses-manage'>
            <div className='container-courses-manage'>
            <div className="main-container-manage-goals">
            <CoursesManageNav action={obj.Send}/>
            <TitleManageCourse
            title='Manage your course' />
        <div className="container-manage-goals">
              {loading
              ?
              <LoaderCreateCourse/>
              :
              <>
                <InputTitleLanding action={obj.SetTitle} id='title' limitNum={60} place='Insert your course title.'>Course title</InputTitleLanding>
                <InputTitleLanding action={obj.SetSubTitle} id='subtitle' limitNum={120} place='Insert your course subtitle.'>Course subtitle</InputTitleLanding>
                <p className="label-input-landing">Course description</p>
                <ReactQuill 
                // theme="snow"
                // value={value}
                placeholder="Insert your course description."
                onChange={(e)=>{
                  mediator(e)
                }}
                modules={modules}
                />
                <p className="label-input-landing">Basic info</p>
                <div className="container-pricing-select">
                <SelectPricing 
                name="languaje"
                id="languaje"
                >
                <OptionsPricing value='US'>English(US)</OptionsPricing>

                </SelectPricing>

                <SelectPricing 
                name="level"
                id="level"
                action={obj.SetLevel}
                >
                <OptionsPricing value='null'>--Select Level--</OptionsPricing>
                <OptionsPricing value='Beginner Level'>Beginner level</OptionsPricing>
                <OptionsPricing value='Intermediate Level'>Intermediate level</OptionsPricing>
                <OptionsPricing value='Expert Level'>Expert Level</OptionsPricing>
                <OptionsPricing value='All Levels'>All Levels</OptionsPricing>
                </SelectPricing>

                <SelectPricing 
                name="Category"
                id="Category"
                action={obj.SetCategory}
                >
                <OptionsPricing value='null'>--Select Category--</OptionsPricing>
                <OptionsPricing value='Development'>Development</OptionsPricing>
                <OptionsPricing value='IT & Software'>IT & Software</OptionsPricing>
                <OptionsPricing value='Design'>Design</OptionsPricing>
                <OptionsPricing value='Marketing'>Marketing</OptionsPricing>
                <OptionsPricing value='Teaching & Academics'>Teaching & Academics</OptionsPricing>

                </SelectPricing>


                </div>
                <InputTitleLanding action={obj.SetTeaching} limitNum={-1} place='e.g Landscape Photography.'>What is primarily taught in your course?</InputTitleLanding>
                <p className="label-input-landing">Course image</p>
                <PromotionalSource accept=".png, .jpg, .jpeg" id='source-image' video={false}/>
                <p className="label-input-landing">Promotional video</p>
                <PromotionalSource accept="video/mp4,video/x-m4v,video/*" id='source-video' video={true}/>




                <p className="p-manage-goals">The following descriptions will be publicly visible on your Course Landing Page and will have a direct impact on your course performance. These descriptions will help learners decide if your course is right for them.</p>
                <LearnInYourCourse
                title='What will students learn in your course?'
                info='You must enter at least 4 learning objectives or outcomes that learners can expect to achieve after completing your course.'
                minInputs={arrs.learn}
                minInputsNum={4}
                limit={true}
                place='Example: Define the roles and responsibilities of a project manager'
                limitNum={160}
                obj={obj.SetLearn}
                seccion='learn'
                />
                <LearnInYourCourse
                title='What are the requirements or prerequisites for taking your course?'
                info='List the required skills, experience, tools or equipment learners should have prior to taking your course.
                If there are no requirements, use this space as an opportunity to lower the barrier for beginners.'
                minInputs={arrs.requirements}
                minInputsNum={1}
                limit={false}
                place='Example: No programming experience needed. You will learn everything you need to know"'
                limitNum={-1}
                obj={obj.SetRequirements}
                seccion='requirements'
                />
                <LearnInYourCourse
                title='Who is this course for?'
                info='Write a clear description of the intended learners for your course who will find your course content valuable.
                This will help you attract the right learners to your course.'
                minInputs={arrs.thisCourse}
                minInputsNum={1}
                limit={false}
                place='Example: No programming experience needed. You will learn everything you need to know"'
                limitNum={-1}
                obj={obj.SetThisCourse}
                seccion='thisCourse'
                />




                <h3 className="subtitle-manage-pricing">Course Price Tier</h3>
                <p className="p-manage-pricing">Please select the price tier for your course below and click 'Save'. The list price that students will see in other currencies is determined using the price tier matrix.</p>
                <p className="p-manage-pricing">If you intend to offer your course for free, the total length of video content must be less than 2 hours.</p>
                <div className="container-pricing-select">
                <SelectPricing 
                name="currency"
                id="currency"
                >
                <OptionsPricing value='USD'>USD</OptionsPricing>

                </SelectPricing>

                <SelectPricing 
                name="price"
                id="price"
                action={obj.SetPrice}
                >
                <OptionsPricing value='Free'>Free</OptionsPricing>
                <OptionsPricing value='19.99'>$19.99</OptionsPricing>
                <OptionsPricing value='24.99'>$24.99</OptionsPricing>
                <OptionsPricing value='29.99'>$29.99</OptionsPricing>
                <OptionsPricing value='34.99'>$34.99</OptionsPricing>
                <OptionsPricing value='39.99'>$39.99</OptionsPricing>
                <OptionsPricing value='44.99'>$44.99</OptionsPricing>
                <OptionsPricing value='49.99'>$49.99</OptionsPricing>
                <OptionsPricing value='54.99'>$54.99</OptionsPricing>
                <OptionsPricing value='59.99'>$59.99</OptionsPricing>
                <OptionsPricing value='64.99'>$64.99</OptionsPricing>
                <OptionsPricing value='69.99'>$69.99</OptionsPricing>
                <OptionsPricing value='74.99'>$74.99</OptionsPricing>
                <OptionsPricing value='79.99'>$79.99</OptionsPricing>
                <OptionsPricing value='84.99'>$84.99</OptionsPricing>
                <OptionsPricing value='89.99'>$89.99</OptionsPricing>
                <OptionsPricing value='94.99'>$94.99</OptionsPricing>
                <OptionsPricing value='99.99'>$99.99</OptionsPricing>
                <OptionsPricing value='109.99'>$109.99</OptionsPricing>
                <OptionsPricing value='119.99'>$119.99</OptionsPricing>
                <OptionsPricing value='124.99'>$124.99</OptionsPricing>
                <OptionsPricing value='129.99'>$129.99</OptionsPricing>
                <OptionsPricing value='139.99'>$139.99</OptionsPricing>
                <OptionsPricing value='149.99'>$149.99</OptionsPricing>
                <OptionsPricing value='159.99'>$159.99</OptionsPricing>
                <OptionsPricing value='169.99'>$169.99</OptionsPricing>
                <OptionsPricing value='174.99'>$174.99</OptionsPricing>
                <OptionsPricing value='179.99'>$179.99</OptionsPricing>
                <OptionsPricing value='189.99'>$189.99</OptionsPricing>
                <OptionsPricing value='199.99'>$199.99</OptionsPricing>

                </SelectPricing>
                </div>
                </>
                }
                
            </div>

        </div>

            </div>
        </div>
    )
}
export default CoursesManage;
