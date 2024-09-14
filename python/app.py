from sqlalchemy import Column, Integer, ForeignKey, String, and_
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
    
app = Flask(__name__)

CORS(app=app)

app.config['SQLALCHEMY_DATABASE_URI'] =  "mssql+pyodbc://Test:Test%40123@MAHESH/PY_DB?driver=ODBC+Driver+17+for+SQL+Server"
app.config['SQLALCHEMY_TRACK_MODIFICATIOS'] = False

db = SQLAlchemy(app)


@app.route("/login", methods=["POST"])
def login_employee():
    try:
        data = request.get_json()
        email = data["email"] if "email" in data else ""
        password = data["password"] if "password" in data else ""
        print(f"email {email} and {password}")
        if(email):
            hasEmp = Employee.has_employee(email=email)
            print(f"has emp {hasEmp}")
            if hasEmp:
                verifyPassword = Employee.verify_password(email=email, password=password)
                print(f"print {verifyPassword}")
                if verifyPassword:
                    return {"msg":"successfully logged"}
                else:
                    return {"msg":"Invalid username or password"}, 401
            else:
                return {"msg":"No user account found with this email"}, 500
    except:
        print("error occured")

@app.route("/Organization", methods=["POST"])
def add_organization():
    data = request.get_json()
    email = data["email"] if "email" in data else ""
    password = data["password"] if "password" in data else "Test@123"
    print(f"daa is {email} and {password}")
    res = Organization.add_org(data=data)
    print(f" res {res}")
    if res:
        emp = Employee(data["name"],"OFFICE","ADMIN",res.id,1,email, password)
        
        Employee.add_employee(emp)
    return {"msg":"added successfully"}, 200

@app.route("/Employee", methods=["POST"])
def add_employee():
    try:
        emp = Employee(request.form.get("name")
                       ,request.form.get("location"),
                        request.form.get("code"),
                       request.form.get("org_id"),
                        2,
                       request.form.get("email"),
                       "Test@123",
                        )
    
        Employee.add_employee(emp)
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

class Organization(db.Model):
    __tablename__ ="tbl_organizations"
    
    id = Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    
    @classmethod
    def add_org(cls,data):
        try:
            org = Organization(
                name =data["name"] if "name" in data else "",
                phone =data["phone"] if "phone" in data else ""
            )
            db.session.add(org)
            db.session.commit()
            return org
        except Exception as e:
            print(f"error {e}")
        


class Employee(db.Model):
    __tablename__  = "tbl_employee"
    id = Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String, nullable=True)
    email = Column(String, nullable=False)
    password = Column(String, nullable=False)
    location = Column(String, nullable = True)
    code = Column(String, nullable=True)
    org_id = Column(Integer, ForeignKey(Organization.id))
    role_id = Column(Integer, nullable=False) 
    
    def __init__(self, name, location, code,org_id, role_id, email, password):
        self.name = name
        self.location = location
        self.code = code
        self.role_id = role_id
        self.org_id = org_id
        self.email = email
        self.password  = password
    
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
    
    def add_employee(emp):
        try:
            db.session.add(emp)
            
            db.session.commit()
            return {"msg" :"successfully employee added"}
        except Exception as e:
            print(f"error occured {e}")

    def delete_employee(id):
        emp = Employee.query.filter(Employee.id == id).first()
        db.session.delete(emp)
        db.session.commit()
        
    def has_employee(email):
        return Employee.query.filter(Employee.email == email).first()
    
    def verify_password(email, password):
        return Employee.query.filter(and_(Employee.email == email, Employee.password==password)).first()
with app.app_context():
    db.create_all()
    
if __name__ == "__main__":
    app.run(debug=True)
    print("calling main")