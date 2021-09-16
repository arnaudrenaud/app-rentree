import blank_profile from "./images/blank-profile-picture-female.png";
import Skill from "./Skill";

const Wilder = () => {
  const skills = [
    { title: "HTML", votes: 3 },
    { title: "CSS", votes: 3 },
    { title: "TypeScript", votes: 15 },
    { title: "React", votes: 3 },
    { title: "Node.js", votes: 2 },
    { title: "Python", votes: 10 },
  ];

  return (
    <article className="card">
      <img src={blank_profile} alt="Jane Doe Profile" />
      <h3>Jane Doe</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <h4>Wild Skills</h4>
      <ul className="skills">
        {skills.map((skill) => {
          return (
            <Skill key={skill.title} title={skill.title} votes={skill.votes} />
          );
        })}
      </ul>
    </article>
  );
};

export default Wilder;
