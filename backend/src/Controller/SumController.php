<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class SumController
{
    #[Route('/api/sum', name: 'api_sum', methods: ['POST'])]
    public function sum(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['a']) || !isset($data['b'])) {
            return new JsonResponse(
                ['error' => "Both 'a' and 'b' must be numeric."],
                Response::HTTP_BAD_REQUEST
            );
        }

        if (!is_numeric($data['a']) || !is_numeric($data['b'])) {
            return new JsonResponse(
                ['error' => "Both 'a' and 'b' must be numeric."],
                Response::HTTP_BAD_REQUEST
            );
        }

        return new JsonResponse([
            'sum' => $data['a'] + $data['b']
        ]);
    }
}
