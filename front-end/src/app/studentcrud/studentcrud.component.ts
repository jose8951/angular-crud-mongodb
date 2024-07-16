import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { firstValueFrom } from 'rxjs'

@Component({
  selector: 'app-studentcrud',
  templateUrl: './studentcrud.component.html',
  styleUrls: ['./studentcrud.component.scss'],
})
export class StudentcrudComponent implements OnInit {
  StudentArray: any[] = []
  currentStudentID = ''

  name: string = ''
  address: string = ''
  phone: string = ''

  constructor(private http: HttpClient) {
    this.getAllStudent()
  }
  ngOnInit(): void {}

  /**
   * metodo que da de alta al usuario
   */
  register() {
    let bodyData = {
      name: this.name,
      address: this.address,
      phone: this.phone,
    }

    this.http.post('http://localhost:3000/user/create', bodyData).subscribe({
      next: (resulData: any) => {
        console.log(resulData)
        alert('Student Registered Successfully')
        this.name = ''
        this.address = ''
        this.phone = ''
        this.getAllStudent();
      },
      error: (error) => {
        console.error('There was an error!', error)
        alert('An error occurred while registering the student')
      },
    })
  }

  /**
   * metodo para mostrar un listado de la base de datos est y la tabla employess
   */
  getAllStudent() {
    this.http.get('http://localhost:3000/user/getAll').subscribe({
      next: (resulData: any) => {
        //console.log(resulData)
        this.StudentArray = resulData.data
      },
      error: (error) => {
        console.error('Error fetching all students', error)
      },
    })
  }

  /**
   * Metodo para  mostrar los datos en le formulario
   * @param data 
   */
  setUpdate(data: any) {
    this.name = data.name
    this.address = data.address
    this.phone = data.phone

    this.currentStudentID = data._id
    //alert(this.currentStudentID)
  }


  /**
   * metodo para update los registro de la tabla
   */
  async UpdateRecords() {
    let bodyData = {
      name: this.name,
      address: this.address,
      phone: this.phone,
    }

    const url = `http://localhost:3000/user/update/${this.currentStudentID}`

    try {
      const response = await firstValueFrom(this.http.put(url, bodyData))
      console.log(response)
      alert('Student update successfully')
      this.getAllStudent()
    } catch (error) {
      console.error('Error updatin records ', error)
      alert('Failed to update student record')
    }
  }

  /**
   * metodo guardar los datos por primera vez o una update 
   */
  save() {
    if (this.currentStudentID == '') {
      this.register()
    } else {
      this.UpdateRecords()
    }
  }

  /**
   * metodo para borrar registro y mostramos el listado
   * @param data 
   */
  setDelete(data: any) {
    this.http
      .delete('http://localhost:3000/user/delete' + '/' + data._id)
      .subscribe((resultData: any) => {
        console.log(resultData)
        alert('Student Delete')
        this.getAllStudent()
      })
  }
}
