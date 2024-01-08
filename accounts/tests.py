from django.test import TestCase
from django.urls import reverse
from django.http import JsonResponse
import json
from django.contrib.auth.models import User

# Create your tests here.
class checkEmailTest(TestCase):
    
    def setUp(self):
        self.test__user__email = "test@example.com"
        self.test__user = User.objects.create_user(
            username='test_user',
            email=self.test__user__email,
            password='testpassword'
        )
    
    def test_email_taken(self):
        url = reverse('accounts:check_email')
        data = {'email': self.test__user__email}
        response = self.client.post(url, json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 409)
        self.assertEqual(response.json(), {"message": "Email is taken"})

    def test_email_available(self):
        url = reverse('accounts:check_email')
        data = {'email': 'newfake@example.com'}
        response = self.client.post(url, json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Email is available"})

    def test_email_available_two(self):
        url = reverse('accounts:check_email')
        data = {'email': 'newfake@example.com'}
        response = self.client.post(url, json.dumps(data), content_type='application/json')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Email is available"})
