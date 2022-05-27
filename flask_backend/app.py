from flask import Flask, jsonify, request
from sqlalchemy.orm.attributes import flag_modified
# from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import json 

# load_dotenv("./.flaskenv")

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

server_name = 'asr_projects'


app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://gabe:@localhost/" + server_name
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

@app.route('/projects/update/<project_id>', methods=['PUT'])
def update_project(project_id):
	try:

		project = Projects.query.get(project_id)

		print ('lets update')


		# Update details
		project.project_name = request.json['project_name']
		project.project_description = request.json['project_description']

		print (project.project_name)
		print (project.project_description)

		db.session.commit()

		return project_schema.jsonify(project.serialize())

	except Exception as e:
		return jsonify(e), 500



@app.route('/projects/delete/<project_id>', methods=['DELETE'])
def delete_project(project_id):
	
	try:
		project = Projects.query.get(project_id)

		db.session.delete(project)
		db.session.commit()

		return "Deleted"

	except Exception as e:

		return jsonify(e), 500


@app.route('/projects/get', methods=['GET'])
def get_projects():

	try:

		projects = Projects.query.all()
		results = projects_schema.dump(projects)

		return jsonify(results)

	except Exception as e:

		return jsonify(e), 500


@app.route('/projects/get/<project_id>', methods=['GET'])
def get_project(project_id):

	try:

		project = Projects.query.get(int(project_id))
		result = project_schema.dump(project)

		return jsonify(result)

	except Exception as e:

		return jsonify(e), 500


@app.route('/projects/add', methods=['POST'])
def create_project():

	try:

		print ('hello')
		print (request.json)

		project_name = request.json['project_name']
		project_short_info = request.json['project_short_info']
		project_description = request.json['project_description']



		project = Projects(project_name, project_short_info, project_description)
		db.session.add(project)
		db.session.commit()

		return project_schema.jsonify(project.serialize())

	except Exception as e:

		return jsonify(e), 500




class Projects(db.Model):
	project_id = db.Column(db.Integer, primary_key=True)
	project_name = db.Column(db.Text)
	project_short_info = db.Column(db.Text)
	project_description = db.Column(db.Text)

	def serialize(self):
		return {
			"project_id" : self.project_id,
			"project_name" : self.project_name,
			"project_short_info" : self.project_short_info,
			"project_description" : self.project_description
		}


	def __init__(self, project_name, project_short_info, project_description):
		self.project_name = project_name
		self.project_short_info = project_short_info
		self.project_description = project_description


class ProjectSchema(ma.Schema):
	class Meta:
		fields = ('project_id', 'project_name', 'project_short_info', 'project_description')

project_schema = ProjectSchema()
projects_schema = ProjectSchema(many=True)


@app.route('/papers/update/<paper_id>', methods=['PUT'])
def update_paper(paper_id):
	try:

		paper = Papers.query.get(paper_id)

		print ('trying papers')
		print (request.json)

		# Update details
		paper.paper_name = request.json['paper_name']
		paper.paper_short_info = request.json['paper_short_info']
		paper.paper_description = request.json['paper_description']
		paper.paper_status = request.json['paper_status']

		db.session.commit()

		return paper_schema.jsonify(paper.serialize())

	except Exception as e:
		return jsonify(e), 500



@app.route('/papers/delete/<paper_id>', methods=['DELETE'])
def delete_paper(paper_id):
	
	try:
		paper = Papers.query.get(paper_id)

		db.session.delete(paper)
		db.session.commit()

		return "Deleted"

	except Exception as e:

		return jsonify(e), 500


@app.route('/papers/get', methods=['GET'])
def get_papers():

	try:

		print ('getting papers')

		papers = Papers.query.all()

		results = papers_schema.dump(papers)
		print (results)

		return jsonify(results)

	except Exception as e:

		return jsonify(e), 500

@app.route('/papers/get/<paper_id>', methods=['GET'])
def get_paper(paper_id):

	try:

		paper = Papers.query.get(int(paper_id))
		result = paper_schema.dump(paper)

		return jsonify(result)

	except Exception as e:

		return jsonify(e), 500

@app.route('/papers/add', methods=['POST'])
def create_paper():

	try:

		print ('making paper')
		print (request.json)

		paper_name = request.json['paper_name']
		paper_short_info = request.json['paper_short_info']
		paper_description = request.json['paper_description']
		paper_status = request.json['paper_status']



		paper = Papers(paper_name, paper_short_info, paper_description, paper_status)
		db.session.add(paper)
		db.session.commit()

		return paper_schema.jsonify(paper.serialize())

	except Exception as e:

		return jsonify(e), 500


class Papers(db.Model):
	paper_id = db.Column(db.Integer, primary_key=True)
	paper_name = db.Column(db.Text)
	paper_short_info = db.Column(db.Text)
	paper_description = db.Column(db.Text)
	paper_status = db.Column(db.Text)


	def serialize(self):
		return {
			"paper_id" : self.paper_id,
			"paper_name" : self.paper_name,
			"paper_short_info" : self.paper_short_info,
			"paper_description" : self.paper_description,
			"paper_status" : self.paper_status

		}


	def __init__(self, paper_name, paper_short_info, paper_description, paper_status):
		self.paper_name = paper_name
		self.paper_short_info = paper_short_info
		self.paper_description = paper_description
		self.paper_status = paper_status



class PaperSchema(ma.Schema):
	class Meta:
		fields = ('paper_id', 'paper_name', 'paper_short_info', 'paper_description', 'paper_status')

paper_schema = PaperSchema()
papers_schema = PaperSchema(many=True)




@app.route('/recons/update/<recon_id>', methods=['PUT'])
def update_recon(recon_id):
	try:

		recon = Reconstructions.query.get(recon_id)

		print('Updating reconstruction')

		print (recon.recon_name)

		print (request.json)

		# Update details
		recon.recon_name = request.json['recon_name']
		recon.recon_short_info = request.json['recon_short_info']
		recon.recon_description = request.json['recon_description']
		recon.recon_files = request.json['recon_files']
		recon.recon_status = request.json['recon_status']
		recon.ancestors = int(request.json['recon_ancestors']) if  request.json['recon_ancestors'] else None


		print (recon.recon_status)

		print (recon.recon_ancestors)

		print (recon)

		print ('done')

		db.session.commit()

		# return recon_schema.jsonify(recon.serialize())


		results = recons_schema.dump(recon.serialize())

		return jsonify(results)

	except Exception as e:
		return jsonify(e), 500



@app.route('/recons/delete/<recon_id>', methods=['DELETE'])
def delete_recon(recon_id):
	
	try:
		recon = Reconstructions.query.get(recon_id)

		print ('got recon')
		print (recon.recon_name)

		db.session.delete(recon)
		db.session.commit()
		return "Deleted"

	except Exception as e:

		return jsonify(e), 500


@app.route('/recons/get', methods=['GET'])
def get_recons():

	try:

		recons = Reconstructions.query.all()
		results = recons_schema.dump(recons)

		return jsonify(results)

	except Exception as e:

		return jsonify(e), 500

@app.route('/recons/get/<recon_id>', methods=['GET'])
def get_recon(recon_id):

	print ('getting recon')

	try:

		recon = Reconstructions.query.get(int(recon_id))
		result = recon_schema.dump(recon)

		return jsonify(result)

	except Exception as e:

		return jsonify(e), 500

@app.route('/recons/add', methods=['POST'])
def create_recon():

	try:

		print ('making recons')
		print (request.json)

		recon_name = request.json['recon_name']
		recon_short_info = request.json['recon_short_info']
		recon_description = request.json['recon_description']
		recon_files = request.json['recon_files']
		recon_status = request.json['recon_status']
		recon_ancestors = int(request.json['recon_ancestors'])


		recon = Reconstructions(recon_name, recon_short_info, recon_description, recon_files, recon_status, recon_ancestors)

		print (recon.recon_name)
		print (recon)
		db.session.add(recon)
		db.session.commit()

		return recon_schema.jsonify(recon.serialize())

	except Exception as e:

		return jsonify(e), 500


class Reconstructions(db.Model):
	recon_id = db.Column(db.Integer, primary_key=True)
	recon_name = db.Column(db.Text)
	recon_short_info = db.Column(db.Text)
	recon_description = db.Column(db.Text)
	recon_files = db.Column(db.Text)
	recon_status = db.Column(db.Text)
	recon_ancestors = db.Column(db.Integer)


	def serialize(self):
		return {
			"recon_id" : self.recon_id,
			"recon_name" : self.recon_name,
			"recon_short_info" : self.recon_short_info,
			"recon_description" : self.recon_description,
			"recon_files" : self.recon_files,
			"recon_status" : self.recon_status,
			"recon_ancestors" : self.recon_ancestors

		}


	def __init__(self, recon_name, recon_short_info, recon_description, recon_files, recon_status, recon_ancestors):
		self.recon_name = recon_name
		self.recon_short_info = recon_short_info
		self.recon_description = recon_description
		self.recon_files = recon_files
		self.recon_status = recon_status
		self.recon_ancestors = recon_ancestors



class ReconSchema(ma.Schema):
	class Meta:
		fields = ('recon_id', 'recon_name', 'recon_short_info', 'recon_description', 'recon_files', 'recon_status', 'recon_ancestors')

recon_schema = ReconSchema()
recons_schema = ReconSchema(many=True)


if __name__ == '__main__':
	app.run()