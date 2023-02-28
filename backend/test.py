import unittest
from app import app
from flask import request, jsonify


class FlaskTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_home(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)

    def test_hello(self):
        response = self.app.get('/api/predict')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, 0,23)

    def test_hello_name(self):
        response = self.app.get('/api/anime')
        self.assertEqual(response.status_code, 200)
        anime_df = pd.read_csv("/home/aubain/M2PRO/anime_project/Anime-Mlops/data/Anime_data.csv")
        self.assertEqual(response.json, jsonify(anime_df.to_dict(orient="records")))


if __name__ == '__main__':
    unittest.main()
