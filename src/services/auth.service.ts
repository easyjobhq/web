import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "./getAuthorizationHeader";
import { CreateQuestionDto } from "@/interfaces/create-question.dto";
import { CreateReviewDto } from "@/interfaces/create-review.dto";
import { headers } from "next/headers";
import ProfessionalCard from "@/app/(general)/home/professionalCard";

export class AuthService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
      },
      
    });
  }

  login = async (email: string, password: string) => {
    try{
      const res = await this.instance
      .post("/auth/client/login", {
        email,
        password,
      });

      console.log("Respuesta del login", res.data)

      return res
    }catch(error){
      const res = await this.instance
        .post("/auth/professional/login",{
          email,
          password
        });

        return res;
    }
  };


  register = async (name:string, last_name:string, email:string, phone_number:string, password:string, photo_url:string, service_id: string, language_id:string, city_id:string, speciality_id:string, selectedOption: string) =>{
    if(selectedOption == 'Prof'){

      //console.log("este es el serviceId " + service_id + '\n este es el language_id ' + language_id + "\n este es el city_id" + city_id + "\n este es el speciality_id " + speciality_id);
      const res = await this.instance
      .post("/auth/professional/register",{
        name,
        last_name,
        email,
        phone_number,
        photo_url,
        password,
        service_id,
        language_id,
        city_id,
        speciality_id,
      });
      console.log(res)

    }else{
      const res = await this.instance
      .post("/auth/client/register",{
        name,
        last_name,
        email,
        phone_number,
        photo_url,
        password
      });

      console.log(res)


      return {
        username: "test",
        id: "test",
        accessToken: "test",
        expiredAt:  Date.now() + 60 * 60 * 24 * 7,
    }  
    }
      

  }

  getMe = async (userId: string) => {
    try {
      const res = await this.instance
      .get(`/clients/${userId}`, {
        headers: getAuthorizationHeader(),
      });
    
      return res.data;

    } catch (error ) {
      const res = await this.instance
      .get(`/professionals/${userId}`, {
        headers: getAuthorizationHeader(),
      });
    
      return res.data;
    }
  };

  getProfessionals = async (page: number = 1, limit: number = 10) => {
    const res = await this.instance
    .get(`/professionals?page=${page}&limit=${limit}`, {
      headers: getAuthorizationHeader(),
    });
    return res.data;
  };

  getServicesOfProfessional = async (id: string) => {
    //console.log(getAuthorizationHeader())
    const res = await this.instance
    .get(`/professionals/services/${id}`, {
      headers: getAuthorizationHeader(),
    })
    return res.data
  }

  getCitiesOfProfessional = async (id: string) => {
    //console.log(getAuthorizationHeader())
    const res = await this.instance
    .get(`/professionals/cities/${id}`, {
      headers: getAuthorizationHeader(),
    })
    return res.data
  }

  getServices = async ()=>{
    const res = await this.instance
    .get('/services',{
      headers: getAuthorizationHeader(),
    })

    return res.data
  }

  getSpeciality = async () =>{
    const res = await this.instance
    .get('/specialities',{
      headers: getAuthorizationHeader(),
    })

    return res.data
  }
  
  addServiceToProfessional=  async (professional_id:string, service_id:string) =>{
    const res = await this.instance
    .get(`/professionals/service/${professional_id}/${service_id}`,{
        headers: getAuthorizationHeader(),
      }
    )

    return res.status
  }

  addSpecialityToProfessional = async (Professional_id:string, speciality_id_id:string) =>{
    const res = await this.instance
    .get(`/professionals/specialities/${Professional_id}/${speciality_id_id}`,{
      headers: getAuthorizationHeader()
    })
  }

  getCity = async () =>{
    const res = await this.instance
    .get('/city',{
      headers:getAuthorizationHeader(),
    })

    return res.data
  }

  getProfessional = async (id: string) => {
    const res = await this.instance
    .get(`/professionals/${id}`, {
      headers: getAuthorizationHeader(),
    })
    return res.data
  }

  getSpecialitiesOfProfessional = async (id: string) => {
    const res = await this.instance
    .get(`/professionals/specialities/${id}`, {
      headers: getAuthorizationHeader(),
    })

    return res.data
  }

  getPaymentMethods = async () => {
    const res = await this.instance.get('/payment-method', {
      headers: getAuthorizationHeader(),
    });
    return res.data;
  };

  getLanguage = async () =>{
    const res = await this.instance
    .get('/language',{
      headers:getAuthorizationHeader(),
    })

    return res.data
  }

  getReviewsOfProfessional = async (id: string) =>{
    const res = await this.instance
    .get(`/reviews/professional/${id}`,{
      headers:getAuthorizationHeader(),
    })

    return res.data
  }

  getQuestionsOfProfessional = async (id: string) =>{
    const res = await this.instance
    .get(`/questions/professional/${id}`,{
      headers:getAuthorizationHeader(),
    })

    return res.data
  }


  updateProfessional = async (id:string| undefined, name:string | undefined, last_name:string | undefined, email:string | undefined, phone_number:string | undefined, photo_url:string | undefined)=>{
    try {
      const res = await this.instance.patch(
        `/professionals/${id}`,
        {
          name,
          last_name,
          email,
          phone_number,
          photo_url,
        },
        {
          headers: getAuthorizationHeader(),
        }
      );
      return res.data; // Asumiendo que quieres retornar los datos de la respuesta
    } catch (error) {
      console.error('Error updating professional:', error);
      throw error; // Lanza el error para que pueda ser manejado por el llamador
    }
  }

  getAllCities = async () => {
    const res = await this.instance
    .get('/city',{
      headers:getAuthorizationHeader(),
    })

    return res.data
  }

  getAllSpecialities = async () => {
    const res = await this.instance
    .get('/specialities',{
      headers:getAuthorizationHeader(),
    })

    return res.data
  }


  deleteServiceToProfessional = async (id_professional:string, id_service:string) =>{
    const res = await this.instance
    .delete(`/professionals/oneservice/${id_professional}/${id_service}`,{
      headers: getAuthorizationHeader(),
    })

    return res.status

  }

  deleteSpecialityToProfessional = async (id_professional:string, id_speciality:string) =>{
    const res= await this.instance
    .delete(`/professionals/onespeaciality/${id_professional}/${id_speciality}`,{
      headers: getAuthorizationHeader(),
    })

    return res.status

  }


  createQuestion = async (id_client: string, id_professional: string, question: CreateQuestionDto) => {
    const res = await this.instance
    .post(`/questions/${id_client}/${id_professional}`, 
        question
        ,
        {
          headers: getAuthorizationHeader(),
        } 
     );
  }

  createReview = async (id_client: string, id_professional: string, review: CreateReviewDto) => {
    const res = await this.instance
    .post(`reviews/client/${id_client}/profesional/${id_professional}`, 
        review
        ,
        {
          headers: getAuthorizationHeader(),
        } 
     );

    }

    searchProfessionals = async (city: string, speciality: string) => {
      const res = await this.instance
      .get(`/professionals/city/${city}/speciality/${speciality}`, {
        headers: getAuthorizationHeader(),
      });
      return res.data;
    };
  





  /*uploadAvatar = (userId: string, newAvatar: File) => {
    const formData = new FormData();
    formData.append("file", newAvatar);
    return this.instance
      .post(`/users/${userId}/upload`, formData, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return {
          newAvatar: res.data.data.url,
        };
      });
  };*/
}