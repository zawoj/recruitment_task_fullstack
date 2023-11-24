<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class NBPController extends AbstractController
{
    /**
     * @Route("/n/b/p", name="app_n_b_p")
     */
    public function index(): Response
    {
        return $this->render('nbp/index.html.twig', [
            'controller_name' => 'NBPController',
        ]);
    }
}
