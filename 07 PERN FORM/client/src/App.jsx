import { useState, useEffect } from 'react';

const App = () => {
  const [formData, setformData] = useState({
    name : "",
    email : "",
    age : 0,
    gender : "male",
    framework : {
      react: false,
      angular: false,
      vue: false
    }
  });


  const handleFrameworkChange = (framework) => {
    const updatedFramework = { react: false, angular: false, vue: false };
    updatedFramework[framework] = true;

    setformData({
      ...formData,
      framework: updatedFramework
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData))
    // Send data to the backend via POST
    fetch('/api', {  
      method: 'POST', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify(formData)}) 
    
      setformData({
      name : "",
      email : "",
      age : 0,
      gender : "",
      framework : {
        react: false,
        angular: false,
        vue: false
      }
    })
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
    <h1>Form</h1>

{/*Name*/}
      <label htmlFor="name">Full Name
      <input type="text" id="name" autoComplete='true' placeholder='Name'
                value={formData.name}
                onChange={e => {
                  setformData({
                    ...formData,
                    name: e.target.value
                  });
                }}/>
      </label>

{/*Email*/}
      <label htmlFor="email">Email
      <input type="email" id="email" autoComplete='true' placeholder='Email'
                      value={formData.email}
                      onChange={e => {
                        setformData({
                          ...formData,
                          email: e.target.value
                        });
                      }}/>
      </label>

{/*Age*/}
      <label htmlFor="age">Age
      <input type="number" id="age" autoComplete='true' placeholder='Age'
                      value={formData.age}
                      onChange={e => {
                        setformData({
                          ...formData,
                          age: e.target.value
                        });
                      }}/>
      </label>

{/*Gender*/}
      <label htmlFor="gender">Select your gender
      <select name="gender" id="gender" 
                      value={formData.gender}
                      onChange={e => {
                        setformData({
                          ...formData,
                          gender: e.target.value
                        });
                      }}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      </label>

        {/* Framework */}
        <div className="frame-work">
          <label htmlFor="react">
            <input
              type="radio"
              id="react"
              name="framework"
              value="react"
              checked={formData.framework.react}
              onChange={() => handleFrameworkChange("react")}
            />
            React
          </label>

          <label htmlFor="angular">
            <input
              type="radio"
              id="angular"
              name="framework"
              value="angular"
              checked={formData.framework.angular}
              onChange={() => handleFrameworkChange("angular")}
            />
            Angular
          </label>

          <label htmlFor="vue">
            <input
              type="radio"
              id="vue"
              name="framework"
              value="vue"
              checked={formData.framework.vue}
              onChange={() => handleFrameworkChange("vue")}
            />
            Vue
          </label>
        </div>


  <button type='submit'>Submit</button>
      </form>

      <div className='details'>
        {formData.name} <br />
        {formData.email} <br />
        {formData.age !== 0 && (
          <div>
            {formData.age} <br />
          </div>
        )}
        {formData.gender} <br />
        {formData.framework.react && "React"}
        {formData.framework.angular && "Angular"}
        {formData.framework.vue && "Vue"}
      </div>

    </>
  );
};

export default App;