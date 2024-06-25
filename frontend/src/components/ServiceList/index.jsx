import React from 'react'

import ServiceCard from './ServiceCard'

import { Col } from 'reactstrap'

import weatherImg from '../../assets/images/weather.png'
import guideImg from '../../assets/images/guide.png'
import customizationImg from '../../assets/images/customization.png'


const servicesData =
    [
        {
            imgUrl: weatherImg,
            title: 'Calculate Weather',
            desc: 'A service providing real-time or forecasted meteorological data and analysis for a given location or region as per requirements'
        },
        {
            imgUrl: guideImg,
            title: 'Guide',
            desc: 'A service offering assistance, advice, or step-by-step instructions to help users navigate through processes, systems, or information effectively'
        },
        {
            imgUrl: customizationImg,
            title: 'Customization',
            desc: 'A service allowing users to tailor or personalize their experiences, products, or solutions according to their preferences, needs, or specifications'
        }
    ]

const ServiceList = () => {
    return (
        <>
            {
                servicesData.map((item, index) => {
                    return <Col lg = '3' key={index}><ServiceCard item={item}/></Col>
                })
            }
        </>
    )
}

export default ServiceList