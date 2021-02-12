import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { skills } from "../../templates/context/SkillsContext";

const SkillSelect = ({ selectedSkills, setSelectedSkills }) => {
  const [filtered, setFiltered] = useState([]);
  const [skill, setSkill] = useState("");

  useEffect(() => {
    const filterSkills = () => {
      if (skill === "") {
        setFiltered([]);
        return;
      }
      const filtered = skills.filter(
        (skills) => skills.name.toLowerCase().indexOf(skill.toLowerCase()) === 0
      );
      setFiltered(filtered);
    };
    filterSkills();
  }, [skill]);

  const addSkill = (skill) => {
    if (selectedSkills.includes(skill.name)) {
      toast.error("You cannot select the skill you already chose xD");
      return;
    }
    setSelectedSkills([...selectedSkills, skill.name]);
  };
  const delSkill = (skill) => {
    const newSkillsets = selectedSkills.filter((skills) => skills !== skill);
    setSelectedSkills(newSkillsets);
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="form-group">
        <label htmlFor="skills" className="h3">
          Skills
        </label>
        <div className="text-light mb-2">
          {selectedSkills.map((skill, index) => (
            <span
              className="badge badge-dark px-3 py-2 mr-2 mb-1 rounded-sm  border border-dark shadow-sm"
              key={index}
              style={{ fontSize: "0.9rem" }}
            >
              {skill}
              <i
                className="fas fa-times pointer-cursor ml-2"
                onClick={() => delSkill(skill)}
              />
            </span>
          ))}
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Start typing out the skills and click to pick them"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <ul className="list-group background shadow-lg">
          {filtered !== [] &&
            filtered.map((skill, index) => (
              <li
                key={index}
                className="list-group-item background pointer-cursor"
                onClick={() => addSkill(skill)}
              >
                {skill.name}
              </li>
            ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default SkillSelect;
