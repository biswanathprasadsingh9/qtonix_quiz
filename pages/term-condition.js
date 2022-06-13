import React from 'react'
import { connect } from 'react-redux'
import Body from './components/Body'
import QuizBody from './components/QuizBody'

export const termcondition = (props) => {
  return (
    <QuizBody>
        <section className="section">
            <div className="container">
                <h1>Terms and Conditions</h1>
                <br />
                <br />
                <p>Lorem ipsum,  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad voluptate ut quae, suscipit laudantium officiis vel aliquid omnis sunt magnam temporibus quia ullam qui tenetur dolores voluptates asperiores ab minus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ipsum maxime reiciendis ipsa omnis quisquam, eum debitis consectetur perspiciatis dignissimos consequatur aut id adipisci aperiam deleniti, voluptates laudantium culpa molestias! Lorem ipsum dolor sit amet consectetur adipisicing elit. In sed corrupti itaque id, facere suscipit deleniti numquam officia consequuntur saepe iure quas nobis repudiandae, obcaecati harum quasi quia pariatur recusandae. dolor sit amet consectetur adipisicing elit. Ratione cum perferendis minus vero magnam quibusdam blanditiis, labore ducimus ad vel rem quasi consequatur repudiandae nemo consectetur itaque, deleniti deserunt assumenda!</p>

                <br />
                <p>Lorem ipsum,  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad voluptate ut quae, suscipit laudantium officiis vel aliquid omnis sunt magnam temporibus quia ullam qui tenetur dolores voluptates asperiores ab minus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ipsum maxime reiciendis ipsa omnis quisquam, eum debitis consectetur perspiciatis dignissimos consequatur aut id adipisci aperiam deleniti, voluptates laudantium culpa molestias! Lorem ipsum dolor sit amet consectetur adipisicing elit. In sed corrupti itaque id, facere suscipit deleniti numquam officia consequuntur saepe iure quas nobis repudiandae, obcaecati harum quasi quia pariatur recusandae. dolor sit amet consectetur adipisicing elit. Ratione cum perferendis minus vero magnam quibusdam blanditiis, labore ducimus ad vel rem quasi consequatur repudiandae nemo consectetur itaque, deleniti deserunt assumenda!</p>
                <br />

                <p>Lorem ipsum,  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad voluptate ut quae, suscipit laudantium officiis vel aliquid omnis sunt magnam temporibus quia ullam qui tenetur dolores voluptates asperiores ab minus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ipsum maxime reiciendis ipsa omnis quisquam, eum debitis consectetur perspiciatis dignissimos consequatur aut id adipisci aperiam deleniti, voluptates laudantium culpa molestias! Lorem ipsum dolor sit amet consectetur adipisicing elit. In sed corrupti itaque id, facere suscipit deleniti numquam officia consequuntur saepe iure quas nobis repudiandae, obcaecati harum quasi quia pariatur recusandae. dolor sit amet consectetur adipisicing elit. Ratione cum perferendis minus vero magnam quibusdam blanditiis, labore ducimus ad vel rem quasi consequatur repudiandae nemo consectetur itaque, deleniti deserunt assumenda!</p>

                
                
            </div>
        </section>
    </QuizBody>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(termcondition)