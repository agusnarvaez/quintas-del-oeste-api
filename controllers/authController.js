import axios from 'axios';
const controller = {

    register: async (req, res) => {
      const { name,lastName,email,password,admin } = req.body

        try {
            const response = await axios.post('http://localhost:3030/api/user/create', req.body);
            console.log(response.data)
            res.json(response.data)
          } catch (error) {
            console.log(error)
            res.status(500).send('Error al crear el usuario')
          }
    },
    login: async (req, res) => {

        res.send("auth/login")
    }
}

export default controller