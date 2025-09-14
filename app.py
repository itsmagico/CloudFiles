from flask import Flask, request, jsonify, send_from_directory, render_template
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads/cloud'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Landing page
@app.route('/')
def index():
    return render_template('index.html')

# Upload page
@app.route('/upload')
def upload_page():
    return render_template('upload.html')

# Endpoint de upload
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'Nenhum arquivo enviado'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Arquivo inválido'}), 400

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    file_url = f'https://cloudfiles.onrender.app/downloads/cloud/{file.filename}'
    return jsonify({'link': file_url})

# Servir arquivos localmente para teste
@app.route('/downloads/cloud/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

if __name__ == '__main__':
    app.run(debug=True)
