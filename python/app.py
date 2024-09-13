from sqlalchemy import Column, Integer, ForeignKey, String
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
    
app = Flask(__name__)

CORS(app=app)

app.config['SQLALCHEMY_DATABASE_URI'] =  "mssql+pyodbc://Test:Test%40123@MAHESH/PY_DB?driver=ODBC+Driver+17+for+SQL+Server"
app.config['SQLALCHEMY_TRACK_MODIFICATIOS'] = False

db = SQLAlchemy(app)

@app.route("/Employee", methods=["POST"])
def add_employee():
    try:
        Employee.add_employee(request=request)
        return {"msg" :"successfully employee added"}, 200
    except:
        print("error")

@app.route("/Employee", methods=["GET"])
def get_employees():
    emps = Employee.get_employees()

    return {"result":emps}, 200

@app.route("/Employee", methods=["DELETE"])
def delete_emp():
    try:
        id:int = request.args.get("id")
        Employee.delete_employee(id)
        return {"msg":"deleted successfully"},200
    except Exception as e:
        print(f"error occured {e}")


class Employee(db.Model):
    __tablename__  = "tbl_employee"
    id = Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String, nullable=True)
    location = Column(String, nullable = True)
    code = Column(String, nullable=True)
    # role_id = Column(String, ForeignKey("tbl_roles.id"), nullable=False) 
    
    def get_employees():
        employees = Employee.query.all()
        return [
            {
                "id":emp.id,
                "name":emp.name,
                "code":emp.code,
                "location":emp.location,
             }  for emp in employees
        ]
    def add_employee(request):
        try:
            name = request.form.get("name")
            code = request.form.get("code")
            location = request.form.get("location")
            # role_id = request.form.get("roleId")
            
            db.session.add(Employee(
                name=name,
                code=code,
                location = location
                # role_id = role_id
            ))
            
            db.session.commit()
            return {"msg" :"successfully employee added"}
        except Exception as e:
            print(f"error occured {e}")

    def delete_employee(id):
        emp = Employee.query.filter(Employee.id == id).first()
        db.session.delete(emp)
        db.session.commit()
        
with app.app_context():
    db.create_all()
    
if __name__ == "__main__":
    app.run(debug=True)
    print("calling main")