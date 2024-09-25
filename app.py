from flask import Flask, request, render_template, redirect, url_for, flash # type: ignore
import tensorflow as tf # type: ignore
from tensorflow.keras.models import load_model # type: ignore
import numpy as np # type: ignore
from PIL import Image # type: ignore
import os
import uuid

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads/'

# Modeli yükleyin
model = load_model('model/my_model.keras')

# Fotoğraf uzantılarını kontrol edin
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        flash('Dosya yüklenmedi!')
        return redirect(request.url)

    file = request.files['file']

    if file.filename == '':
        flash('Dosya seçilmedi!')
        return redirect(request.url)

    if file and allowed_file(file.filename):
        # Dosyayı kaydet
        filename = str(uuid.uuid4()) + ".jpg"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Görüntüyü işleyin ve tahmin yapın
        img = Image.open(filepath).resize((28, 28))  # Görüntüyü yeniden boyutlandır
        img_array = np.array(img)
        img_array = np.expand_dims(img_array, axis=0)

        predictions = model.predict(img_array)
        predicted_class = np.argmax(predictions[0])

        # Tahmin ve fotoğrafı sonuçlar sayfasına yönlendirin
        return redirect(url_for('results', prediction=predicted_class, image_file=filename))

    else:
        flash('Geçersiz dosya türü!')
        return redirect(request.url)

@app.route('/results')
def results():
    prediction = request.args.get('prediction')
    image_file = request.args.get('image_file')
    return render_template('sonuc.html', prediction=prediction, image_file=image_file)

if __name__ == '__main__':
    app.run(debug=True)
