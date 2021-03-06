import { api } from '../boot/axios'


/**
 *
 * @param {string} url Url (EndPoint) da API onde será feito o POST
 * @param {string} data Dados à serem enviados à API, como Usuário, senha etc...
 * @param {string} token Token de autorização JWT
 * @returns {Object} Essa função retornará um JSON contendo o status da requisição, e os dados em caso de sucesso
 */
export const PostData = async (url, dados, token) => {
  try {
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
    const response = await api.post(url, dados, { headers })
    const data = response.data;

    if (data.status == "sucesso") {
      return data;
    } else if (data.status == "erro") {
      return data;
    }
  } catch (error) {
    return { status: 'erro', message: 'Ocorreu um erro interno.', data: error }
  }

}

/**
 *
 * @param {string} url Url (EndPoint) da API onde será feito o GET
 * @param {string} token Token de autorização JWT
 * @returns {Object} Essa função retornará um JSON contendo o status da requisição, e os dados em caso de sucesso
 */
export const GetData = async (url, token) => {
  try {
    const headers = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
    const response = await api.get(url, { headers })
    const data = response.data;

    if (data.status == "sucesso") {
      return data;
    } else if (data.status == "erro") {
      return data;
    }
  } catch (error) {
    return { status: 'erro', message: 'Ocorreu um erro interno.', data: error }
  }

}
