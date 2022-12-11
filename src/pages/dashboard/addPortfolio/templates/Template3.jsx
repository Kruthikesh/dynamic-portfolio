import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  CustomSimpleInput,
  CustomTeaxtArea,
} from "../../../../components/common/CustomInputs";
import SocialLinks from "../components/SocialLinks";
import { apiCommon } from "../../../../services/models/CommonModel";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

const schema=yup.object().shape(
    {
        // name:yup.string().required("gregergre"),
        headerTitle:yup.string().max(5).required(),
        about:yup.string().required(),
        behanceRssLink:yup.string().required(),
        mediumRssLink:yup.string().required(),

    }
);

const Template3 = () => {
  const {register,handleSubmit,formState:{errors}}=useForm({
    resolver:yupResolver(schema),
  });
  
  const [data, setData] = useState({
    name: "",
    headerTitle: "",
    about: "",
    behanceRssLink: "",
    mediumRssLink: "",
    themes: "black",
    fontfamily: "inter",
  });
  const handleInputs = (e) => {
    
    setData({...data, [e.target.name]: e.target.value });
  };
  const [socialLinks, setSocialLinks] = useState([]);

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    toast("Please Wait! while we are adding...");
    const userID = localStorage.getItem("dynamic-id");

    const body = {
      userID: userID,
      name: data.name,
      about: data.about,
      headerTitle: data.headerTitle,
      behanceRssLink: `https://api.rss2json.com/v1/api.json?rss_url=https://www.behance.net/feeds/user?username=${data.behanceRssLink}`,
      mediumRssLink: `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${data.mediumRssLink}`,
      socialLinks: socialLinks,
      template: "template3",
      theme: data.themes,
      font: data.fontfamily,
    };
    // console.log(body);

    apiCommon.post(body, "portfolio", true).then((res) => {
      if (res.status === "200") {
        toast.success("Portfolio added !");
      } else {
        toast.error("Portfolio addition failed !");
      }
    });
    navigate(`/dashboard`);
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <CustomSimpleInput
          label="Name"
          // name="name"
          value={data.name}
          placeholder="John Doe"
          onChange={handleInputs}
          {...register("name")}
        />
        <p>{errors.name?.message}</p>
        <CustomSimpleInput
          label="Header"
          name="headerTitle"
          value={data.headerTitle}
          placeholder="Full stack developer"
          onChange={handleInputs}
          {...register("headerTitle")}
        />
        <p>{errors.headerTitle?.message}</p>
        <CustomTeaxtArea
          label="About"
          name="about"
          value={data.about}
          placeholder="I am freelancer aka coolest guy"
          onChange={handleInputs}
          type="textarea"
          rows="5"
          {...register("about")}
        />
        <p>{errors.about?.message}</p>
        <SocialLinks
          socialLinks={socialLinks}
          setSocialLinks={setSocialLinks}
        />
        <CustomSimpleInput
          label="Behance Username"
          name="behanceRssLink"
          value={data.behanceRssLink}
          placeholder="ex: shelcia"
          onChange={handleInputs}
          {...register("behanceRssLink")}
        />
        <p>{errors.behanceRssLink?.message}</p>
        <CustomSimpleInput
          label="Medium Username (without '@')"
          name="mediumRssLink"
          value={data.mediumRssLink}
          placeholder="ex: shelcia"
          onChange={handleInputs}
          {...register("mediumRssLink")}
        />
        <p>{errors.mediumRssLink?.message}</p>
        <div className="text-right mt-5 mb-4">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Template3;
