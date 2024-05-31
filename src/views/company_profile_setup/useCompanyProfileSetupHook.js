/*eslint-disable array-callback-return */
import { Radio, Select, Space, Upload } from "antd";
import { post_api } from "api";
import { useAuth } from "context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Input, Label } from "reactstrap";
import Map from "views/Map";
const { Option } = Select;

const useCompanyProfileSetupHook = () => {
  const { setCompanyProfile } = useAuth()
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [companyProfileObj, setCompanyProfileObj] = useState({
    pricingPlan: {
      type: "free",
      discount_code: null,
    },
    companyName: null,
    location: {
      lat: 23.026207,
      long: 72.5559631,
    },
    contact: {
      email: null,
      phone: null,
      website: null,
    },
    language: {
      primary: "English",
      secondary: [],
    },
    equipment: [],
    services: [],
    software: [],
    testingTime: null,
    isVaccinated: false,
    logo: null,
    additionalRequirements: [],
  });

  const {
    pricingPlan,
    companyName,
    location,
    contact,
    language,
    equipment,
    services,
    software,
    testingTime,
    isVaccinated,
    logo,
    additionalRequirements,
  } = companyProfileObj;

  const createCompanyProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("pricingPlan", "free");
      formData.append("companyName", companyName);
      Object.entries(location).forEach(([key, value]) => {
        formData.append(`location[${key}]`, value);
      });
      Object.entries(contact).forEach(([key, value]) => {
        formData.append(`contact[${key}]`, value);
      });
      formData.append(`language[primary]`, language.primary);
      language.secondary.forEach((val, index) => {
        formData.append(`language[secondary][${index.toString()}]`, val);
      });
      equipment.forEach((val, index) => {
        formData.append(`equipment[${index}]`, val);
      });
      services.forEach((val, index) => {
        formData.append(`services[${index}]`, val);
      });
      software.forEach((val, index) => {
        formData.append(`software[${index}]`, val);
      });
      additionalRequirements.forEach((val, index) => {
        formData.append(`additionalRequirements[${index}]`, val);
      });
      formData.append("testingTime", testingTime);
      formData.append("isVaccinated", isVaccinated);

      if (logo) {
        formData.append("logo", logo);
      }

      const { data, message } = await post_api("company-profile", formData);
      setCompanyProfile(JSON.stringify(data.profile))
      localStorage.setItem("company_profile", JSON.stringify(data.profile));
      toast.success(message);
      navigate("/dashboard");
      return data;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const countryData = [
    { name: "English", icon: <i className="nc-icon nc-bank" /> },
    { name: "Hindi", icon: <i className="nc-icon nc-bank" /> },
    { name: "Gujarati", icon: <i className="nc-icon nc-bank" /> },
  ];

  const handlePricingPlanChange = (e) => {
    setCompanyProfileObj((prev) => ({
      ...prev,
      pricingPlan: {
        ...prev.pricingPlan,
        discount_code: e.target.value,
      },
    }));
  };

  const handleCompanyChange = (e) => {
    setCompanyProfileObj((prev) => ({
      ...prev,
      companyName: e.target.value,
    }));
  };

  const handleLocationChange = (e) => {
    setCompanyProfileObj((prev) => ({
      ...prev,
      location: {
        lat: 23.026207,
        long: 72.5559631,
      },
    }));
  };

  const handleContactChange = (key, val) => {
    setCompanyProfileObj((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [key]: val,
      },
    }));
  };

  const renderPricingPlan = () => {
    return (
      <>
        <Label className="d-flex">Discount Code</Label>
        <Input
          type="text"
          name="discount_code"
          id="discount_code"
          placeholder="Enter discount code"
          onChange={handlePricingPlanChange}
          value={pricingPlan?.discount_code || ""}
        />
      </>
    );
  };

  const renderCompany = () => {
    return (
      <>
        <Label className="d-flex">Company Name</Label>
        <Input
          type="text"
          name="company_name"
          id="company_name"
          placeholder="Enter company name"
          onChange={handleCompanyChange}
          value={companyName || ""}
        />
      </>
    );
  };

  const renderLocation = () => {
    return (
      <>
        <div>
          <Label className="d-flex">Location Name</Label>
          <Input
            type="text"
            name="location_name"
            id="location_name"
            placeholder="Enter location name"
            onChange={handleLocationChange}
            value={location?.location_name || ""}
          />
        </div>
        <div className="pt-3 pr-5 pl-5">
          <Map lat={23.026207} long={72.5559631} />
        </div>
      </>
    );
  };

  const renderContact = () => {
    return (
      <>
        <div className="mt-4">
          <Label className="d-flex">Email</Label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="Enter email"
            onChange={(e) => handleContactChange("email", e.target.value)}
            value={contact?.email || ""}
          />
        </div>
        <div className="mt-4">
          <Label className="d-flex">Phone</Label>
          <Input
            type="text"
            name="phone"
            id="phone"
            placeholder="Enter phone"
            onChange={(e) => handleContactChange("phone", e.target.value)}
            value={contact?.phone || ""}
          />
        </div>
        <div className="mt-4">
          <Label className="d-flex">Website</Label>
          <Input
            type="text"
            name="website"
            id="website"
            placeholder="Enter website"
            onChange={(e) => handleContactChange("website", e.target.value)}
            value={contact?.website || ""}
          />
        </div>
      </>
    );
  };

  const renderLanguages = () => {
    return (
      <>
        <div className="mt-4">
          <Label className="d-flex">Primary Language</Label>
          <Select
            className="d-flex"
            showSearch
            style={{ width: 200 }}
            placeholder="Primary Language"
            optionFilterProp="children"
            onChange={(val) => {
              setCompanyProfileObj((prev) => ({
                ...prev,
                language: {
                  ...prev.language,
                  primary: val,
                },
              }));
            }}
            value={language?.primary}
          >
            {countryData.map((country) => (
              <Option key={country.name} value={country.name}>
                {country.icon} {country.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className="mt-4">
          <Label className="d-flex">Secondary Language</Label>
          <Select
            className="d-flex"
            showSearch
            style={{ width: 200 }}
            placeholder="Secondary Language"
            optionFilterProp="children"
            onChange={(val) => {
              setCompanyProfileObj((prev) => ({
                ...prev,
                language: {
                  ...prev.language,
                  secondary: [val],
                },
              }));
            }}
            value={language?.secondary}
          >
            {countryData.map((country) => (
              <Option key={country.name} value={country.name}>
                {country.icon} {country.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className="d-flex">
          <Button color="link">Add +</Button>
        </div>
      </>
    );
  };

  const renderEquipment = () => {
    return (
      <>
        <div className="mt-4">
          <Label className="d-flex">Equipment Provided</Label>
          <Select
            value={equipment}
            mode="multiple"
            placeholder="Equipment Provided"
            style={{
              // flex: 1,
              width: 190,
            }}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "Yiminghe",
                label: "yiminghe",
              },
            ]}
            onChange={(val) => {
              setCompanyProfileObj((prev) => ({
                ...prev,
                equipment: val,
              }));
            }}
          />
        </div>
      </>
    );
  };

  const renderService = () => {
    return (
      <>
        <div className="mt-4">
          <Label className="d-flex">services Provided</Label>
          <Select
            value={services}
            mode="multiple"
            placeholder="services Provided"
            style={{
              // flex: 1,
              width: 190,
            }}
            options={[
              {
                value: "nick",
                label: "Nick",
              },
              {
                value: "john",
                label: "John",
              },
              {
                value: "duke",
                label: "Duke",
              },
            ]}
            onChange={(val) => {
              setCompanyProfileObj((prev) => ({
                ...prev,
                services: val,
              }));
            }}
          />
        </div>
      </>
    );
  };

  const renderSoftware = () => {
    return (
      <>
        <div className="mt-4">
          <Label className="d-flex">Software Provided</Label>
          <Select
            value={software}
            mode="multiple"
            placeholder="Software"
            style={{
              // flex: 1,
              width: 190,
            }}
            options={[
              {
                value: "adobe",
                label: "Adobe",
              },
              {
                value: "canva",
                label: "Canva",
              },
              {
                value: "figma",
                label: "Figma",
              },
            ]}
            onChange={(val) => {
              setCompanyProfileObj((prev) => ({
                ...prev,
                software: val,
              }));
            }}
          />
        </div>
      </>
    );
  };

  const renderTestingTime = () => {
    return (
      <>
        <div className="mt-4">
          <Label className="d-flex">Testing Time Provided</Label>
          <Radio.Group
            onChange={(e) => {
              setCompanyProfileObj((prev) => ({
                ...prev,
                testingTime: e.target.value,
              }));
            }}
            value={testingTime}
          >
            <Space direction="vertical">
              <Radio value={"20 min"}>20 Min</Radio>
              <Radio value={"30 min"}>30 Min</Radio>
              <Radio value={"1 hour"}>1 Hour</Radio>
            </Space>
          </Radio.Group>
        </div>
      </>
    );
  };

  const renderVaccination = () => {
    return (
      <>
        <div className="mt-4">
          <Label className="d-flex">Vaccination Required</Label>
          <Radio.Group
            onChange={(e) => {
              setCompanyProfileObj((prev) => ({
                ...prev,
                isVaccinated: e.target.value,
              }));
            }}
            value={isVaccinated}
          >
            <Space direction="vertical">
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Space>
          </Radio.Group>
        </div>
      </>
    );
  };

  const handleChange = (info) => {
    setCompanyProfileObj((prev) => ({
      ...prev,
      logo: info.file.originFileObj,
    }));
  };

  const handleRemove = () => {
    setCompanyProfileObj((prev) => ({
      ...prev,
      logo: null,
    }));
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      +
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const renderUploadLogo = () => {
    return (
      <>
        <div className="mt-4">
          <Label className="d-flex">Logo</Label>
          <Upload
            listType="picture-circle"
            onChange={handleChange}
            onRemove={handleRemove}
          >
            {uploadButton}
          </Upload>
        </div>
      </>
    );
  };

  const handleAddTextbox = () => {
    setCompanyProfileObj((prev) => ({
      ...prev,
      additionalRequirements: [...additionalRequirements, ""],
    }));
  };

  const handleTextboxChange = (index, value) => {
    const updatedRequirements = additionalRequirements.map((item, i) => {
      if (i === index) {
        return value;
      }
      return item;
    });
    setCompanyProfileObj((prev) => ({
      ...prev,
      additionalRequirements: updatedRequirements,
    }));
  };

  const renderAdditionalRequirements = () => {
    return (
      <>
        <div className="mt-4">
          <Label className="d-flex">Additional Requirements</Label>
          {additionalRequirements?.map((requirement, index) => (
            <Input
              className="mt-3"
              key={index}
              type="text"
              placeholder="Enter Additional Requirements"
              value={requirement}
              onChange={(e) => handleTextboxChange(index, e.target.value)}
            />
          ))}
        </div>
        <div className="d-flex">
          <Button color="link" onClick={handleAddTextbox}>
            Add +
          </Button>
        </div>
      </>
    );
  };

  const steps = [
    {
      title: "Pricing Plan",
      content: renderPricingPlan(),
    },
    {
      title: "Company",
      content: renderCompany(),
    },
    {
      title: "Store Location",
      content: renderLocation(),
    },
    {
      title: "Comapany Contact Details",
      content: renderContact(),
    },
    {
      title: "Languages",
      content: renderLanguages(),
    },
    {
      title: "Equipment Provided",
      content: renderEquipment(),
    },
    {
      title: "services Provided",
      content: renderService(),
    },
    {
      title: "Software Used",
      content: renderSoftware(),
    },
    {
      title: "Testing Time",
      content: renderTestingTime(),
    },
    {
      title: "Vaccination",
      content: renderVaccination(),
    },
    {
      title: "Upload Logo",
      content: renderUploadLogo(),
    },
    {
      title: "AdditionalRequirements",
      content: renderAdditionalRequirements(),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const skip = () => {
    setCurrent(current + 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return {
    current,
    next,
    prev,
    skip,
    steps,
    items,
    createCompanyProfile,
  };
};

export default useCompanyProfileSetupHook;
